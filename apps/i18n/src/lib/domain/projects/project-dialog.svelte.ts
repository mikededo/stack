import type { CreateProjectData, Language, Languages, Project } from '$lib/db';

import { useQueryClient } from '@tanstack/svelte-query';
import { gotoWithParams, Keys, pathTo } from '$lib/config';
import { useLanguages } from '$lib/hooks';

type OnMutateArgs = {
  onSuccess: (id: null | number) => void;
};
type FormState = {
  defaultLanguage: string;
  name: string;
  selectedLanguages: Languages[number][];
  website: string;
  description: string;
};
type Data = {
  isLoading: boolean;
  languages?: Languages | null;
};

type UseProjectDialogArgs = {
  onMutate: (data: CreateProjectData, args: OnMutateArgs) => void;
  project?: Project;
};
export const useProjectDialog = ({ onMutate }: UseProjectDialogArgs) => {
  // Async data
  const queryClient = useQueryClient();
  const languagesStore = useLanguages();
  let data = $state<Data>({ isLoading: true });
  languagesStore.subscribe(({ data: queryData, isLoading }) => {
    data = { isLoading, languages: queryData };
  });

  // Form state
  const state = $state<FormState>({
    defaultLanguage: '',
    description: '',
    name: '',
    selectedLanguages: [],
    website: ''
  });

  // Actions
  const onClose = (_?: Event, id?: number) => {
    // If there's an id, we redirect to the newly created project
    const pathname = id ? pathTo('project', { project: `${id}` }) : undefined;
    gotoWithParams({ dialog: undefined }, { pathname });

    state.name = '';
    state.website = '';
  };

  const onConfirm = (e: Event) => {
    const { defaultLanguage, description, name, selectedLanguages, website } = state;
    e.preventDefault();
    if (!name || selectedLanguages.length === 0 || !defaultLanguage) {
      // TODO: Display error
      return;
    }

    const args: CreateProjectData = {
      defaultLanguageId: +defaultLanguage,
      description,
      languageIds: selectedLanguages.map(({ id }) => id),
      name,
      websiteUrl: website
    };

    onMutate(args, {
      onSuccess: (id) => {
        if (!id) {
          return;
        }

        queryClient.invalidateQueries({ queryKey: Keys.PROJECTS });
        onClose(undefined, id);
      }
    });
  };

  const onToggleLanguage = (language: Language) => {
    const iof = state.selectedLanguages.findIndex(({ id }) => id === language.id);
    if (iof !== -1) {
      state.selectedLanguages.splice(iof, 1);
    } else {
      state.selectedLanguages.push(language);
    }
  };

  const onChangeDefaultLanguage = ({ id }: Language) => {
    state.defaultLanguage = `${id}`;
  };

  return {
    actions: { onChangeDefaultLanguage, onClose, onConfirm, onToggleLanguage },
    data,
    state
  };
};
