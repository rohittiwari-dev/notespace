'use client';
import { useState } from 'react';
import {
	useFileUpload,
	type FileMetadata,
	type FileWithPreview,
} from '@/hooks/use-file-upload';
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	CloudUpload,
	ImageIcon,
	TriangleAlert,
	Upload,
	XIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CoverUploadProps {
	maxSize?: number;
	accept?: string;
	className?: string;
	onImageChange?: (file: File | null) => void;
	initialUrl?: string;
	showGuidelines?: boolean;
}

export default function CoverUpload({
	maxSize = 5 * 1024 * 1024, // 5MB default
	accept = 'image/*',
	className,
	showGuidelines = false,
	initialUrl,
	onImageChange,
}: CoverUploadProps) {
	// Default cover image
	const defaultCoverImage: FileMetadata = {
		id: 'default-cover',
		name: 'cover-image.jpg',
		size: 2048000,
		type: 'image/jpeg',
		url: initialUrl || '',
	};

	const [coverImage, setCoverImage] = useState<FileWithPreview | null>({
		id: defaultCoverImage.id,
		file: defaultCoverImage,
		preview: defaultCoverImage.url,
	});

	const [imageLoading, setImageLoading] = useState(true);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);

	const [
		{ isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			getInputProps,
		},
	] = useFileUpload({
		maxFiles: 1,
		maxSize,
		accept,
		multiple: false,
		onFilesChange: (files: any) => {
			if (files.length > 0) {
				setImageLoading(true);
				setIsUploading(true);
				setUploadProgress(0);
				setUploadError(null);
				setCoverImage(files[0]);
				onImageChange?.(files[0].file as File);

				// Simulate upload progress
				simulateUpload();
			}
		},
	});

	// Simulate upload progress
	const simulateUpload = () => {
		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsUploading(false);

					// Simulate occasional upload failure (10% chance)
					if (Math.random() < 0.1) {
						setUploadError('Upload failed. Please try again.');
						return 0;
					}

					return 100;
				}

				// Random progress increment between 5-15%
				const increment = Math.random() * 10 + 5;
				return Math.min(prev + increment, 100);
			});
		}, 200);
	};

	const removeCoverImage = () => {
		setCoverImage(null);
		setImageLoading(false);
		setIsUploading(false);
		setUploadProgress(0);
		setUploadError(null);
		onImageChange?.(null);
	};

	const retryUpload = () => {
		if (coverImage) {
			setUploadError(null);
			setIsUploading(true);
			setUploadProgress(0);
			simulateUpload();
		}
	};

	const hasImage = coverImage && coverImage.preview;

	return (
		<div className={cn('space-y-4 w-full max-h-96', className)}>
			{/* Cover Upload Area */}
			<div
				className={cn(
					'group relative border border-border rounded-xl max-h-96 overflow-hidden transition-all duration-200',
					isDragging
						? 'border-dashed border-primary bg-primary/5'
						: hasImage
							? 'border-border bg-background hover:border-primary/50'
							: 'border-dashed border-muted-foreground/25 bg-muted/30 hover:border-primary hover:bg-primary/5',
				)}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{/* Hidden file input */}
				<input {...getInputProps()} className="sr-only" />

				{hasImage ? (
					<>
						{/* Cover Image Display */}
						<div className="relative w-full max-h-96 aspect-[21/9]">
							{/* Loading placeholder */}
							{imageLoading && (
								<div className="absolute inset-0 flex justify-center items-center bg-muted max-h-96 animate-pulse">
									<div className="flex flex-col items-center gap-2 text-muted-foreground">
										<ImageIcon className="size-5" />
										<span className="text-sm">
											Loading image...
										</span>
									</div>
								</div>
							)}

							{/* Actual image */}
							<Image
								src={coverImage.preview!}
								alt="Cover"
								className={cn(
									'w-full h-full object-cover transition-opacity duration-300',
									imageLoading ? 'opacity-0' : 'opacity-100',
								)}
								width={500}
								height={500}
								onLoad={() => setImageLoading(false)}
								onError={() => setImageLoading(false)}
							/>

							{/* Overlay on hover */}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200" />

							{/* Action buttons overlay */}
							<div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 max-h-96 transition-opacity duration-200">
								<div className="flex gap-2">
									<Button
										onClick={openFileDialog}
										variant="secondary"
										size="sm"
										className="bg-white/90 hover:bg-white text-gray-900"
									>
										<Upload />
										Change Cover
									</Button>
									<Button
										onClick={removeCoverImage}
										variant="destructive"
										size="sm"
									>
										<XIcon />
										Remove
									</Button>
								</div>
							</div>

							{/* Upload progress */}
							{isUploading && (
								<div className="absolute inset-0 flex justify-center items-center bg-black/40 max-h-96">
									<div className="relative">
										<svg
											className="size-16 -rotate-90"
											viewBox="0 0 64 64"
										>
											<circle
												cx="32"
												cy="32"
												r="28"
												fill="none"
												stroke="currentColor"
												strokeWidth="4"
												className="text-white/20"
											/>
											<circle
												cx="32"
												cy="32"
												r="28"
												fill="none"
												stroke="currentColor"
												strokeWidth="4"
												strokeDasharray={`${2 * Math.PI * 28}`}
												strokeDashoffset={`${2 * Math.PI * 28 * (1 - uploadProgress / 100)}`}
												className="text-white transition-all duration-300"
												strokeLinecap="round"
											/>
										</svg>
										<div className="absolute inset-0 flex justify-center items-center">
											<span className="font-medium text-white text-sm">
												{Math.round(uploadProgress)}%
											</span>
										</div>
									</div>
								</div>
							)}
						</div>
					</>
				) : (
					/* Empty State */
					<div
						className="flex flex-col justify-center items-center gap-4 p-8 w-full max-h-96 aspect-[21/9] text-center cursor-pointer"
						onClick={openFileDialog}
					>
						<div className="bg-primary/10 p-4 rounded-full">
							<CloudUpload className="size-8 text-primary" />
						</div>

						<div className="space-y-2">
							<h3 className="font-semibold text-lg">
								Upload Cover Image
							</h3>
							<p className="text-muted-foreground text-sm">
								Drag and drop an image here, or click to browse
							</p>
							<p className="text-muted-foreground text-xs">
								Recommended size: 1200x514px • Max size: 5MB
							</p>
						</div>

						<Button variant="outline" size="sm">
							<ImageIcon />
							Browse Files
						</Button>
					</div>
				)}
			</div>

			{/* Error Messages */}
			{errors.length > 0 && (
				<Alert
					variant="destructive"
					appearance="light"
					className="mt-5"
				>
					<AlertIcon>
						<TriangleAlert />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>File upload error(s)</AlertTitle>
						<AlertDescription>
							{errors.map((error: any, index: any) => (
								<p key={index} className="last:mb-0">
									{error}
								</p>
							))}
						</AlertDescription>
					</AlertContent>
				</Alert>
			)}

			{/* Upload Error */}
			{uploadError && (
				<Alert
					variant="destructive"
					appearance="light"
					className="mt-5"
				>
					<AlertIcon>
						<TriangleAlert />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>Upload failed</AlertTitle>
						<AlertDescription>
							<p>{uploadError}</p>
							<Button
								onClick={retryUpload}
								variant="default"
								size="sm"
							>
								Retry Upload
							</Button>
						</AlertDescription>
					</AlertContent>
				</Alert>
			)}

			{/* Upload Tips */}
			{showGuidelines && (
				<div className="bg-muted/50 p-4 rounded-lg">
					<h4 className="mb-2 font-medium text-sm">
						Cover Image Guidelines
					</h4>
					<ul className="space-y-1 text-muted-foreground text-xs">
						<li>
							• Use high-quality images with good lighting and
							composition
						</li>
						<li>
							• Recommended aspect ratio: 21:9 (ultrawide) for
							best results
						</li>
						<li>
							• Avoid images with important content near the edges
						</li>
						<li>• Supported formats: JPG, PNG, WebP</li>
					</ul>
				</div>
			)}
		</div>
	);
}
