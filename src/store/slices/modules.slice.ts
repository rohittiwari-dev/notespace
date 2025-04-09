import { IModule } from '@/db/schemas';
import { StateCreator } from 'zustand';

export type TModulesInitialState = {
	modules: IModule[];
	module: IModule | null;
	moduleLoading: boolean;
	moduleError: string | null;
};

export const initialState: TModulesInitialState = {
	modules: [],
	module: null,
	moduleLoading: false,
	moduleError: null,
};

export interface IModuleStore extends TModulesInitialState {
	setModulesState: (state: Partial<TModulesInitialState>) => void;
	setModules: (modules: IModule[], module?: string | IModule) => void;
	setModule: (module: IModule | string) => void;
	setModuleLoading: (loading: boolean) => void;
	setModuleError: (error: string | null) => void;
	updateModule: (moduleId: string, module: Partial<IModule>) => void;
	deleteModule: (moduleId: string, type?: 'soft' | 'hard') => void;
	resetModule: () => void;
}

export const ModuleSlice: StateCreator<IModuleStore> = (set) => ({
	...initialState,
	setModulesState: (state) => set(() => ({ ...state })),
	setModules: (modules, module) =>
		set(() => ({
			modules,
			module:
				typeof module === 'string'
					? modules.find((val) => val.id === module) || null
					: module,
		})),
	setModule: (module) =>
		set((state) => ({
			module:
				typeof module === 'string'
					? state.modules.find((val) => val.id === module) || null
					: module,
		})),
	setModuleLoading: (loading) => set(() => ({ moduleLoading: loading })),
	setModuleError: (error) => set(() => ({ moduleError: error })),
	updateModule: (moduleId, module) =>
		set((state) => ({
			modules: state.modules.map((mod) =>
				mod.id === moduleId ? { ...mod, ...module } : mod,
			),
			module:
				state.module?.id === moduleId
					? { ...state.module, ...module }
					: state.module,
		})),
	deleteModule: (moduleId, type = 'soft') =>
		set((state) => {
			if (type === 'soft') {
				return {
					modules: state.modules.map((mod) => {
						if (mod.id === moduleId) mod.in_trash = true;
						return mod;
					}),
					module:
						state.module?.id === moduleId
							? ({
									...state.module,
									in_trash: true,
								} as IModule)
							: state.module,
				};
			}
			return {
				modules: state.modules.filter((mod) => mod.id !== moduleId),
				module: state.module?.id === moduleId ? null : state.module,
			};
		}),
	resetModule: () => set(() => ({ ...initialState })),
});
