/** Interface representing feature flag toggles for a component. */
export interface IFeatureFlags {
    [name: string]: boolean;
}

/** Interface representing a config file. */
export interface IConfig {
    /** Global environment variables/flags. */
    env: {
        /** i18n language. */
        lang: TI18nLang;
    };
    /** Component entries. */
    components: {
        /** Internal identifier of the component. */
        id: string;
        /** Display name of the component. */
        name: string;
        /** Display description of the component. */
        description: string;
        /** Names of the components that precede it in dependency graph. */
        parents?: string[];
        /** Feature flag toggles for the component (handled by the component). */
        flags?: IFeatureFlags;
        /** Names of the syntax elements to register. */
        elements?: string[] | boolean;
    }[];
}

import { IElementSpecification } from '@sugarlabs/musicblocks-v4-lib';

/** Interface representing a component's API. */
export interface IComponent {
    /**
     * Mounts the component (loads subcomponents, mounts DOM elements, etc.).
     *
     * @param flags - feature flag toggles
     */
    mount(flags?: IFeatureFlags): Promise<void>;
    /**
     * Sets up the component — initializes component after it is mounted.
     */
    setup(): Promise<void>;
    /** Syntax element specification object for the component. */
    specification?: {
        [identifier: string]: IElementSpecification;
    };
}

// == i18n =========================================================================================

/** Type representing the allowed i18n language name strings. */
export type TI18nLang = 'en' | 'es';

/** Type representing the schema of a i18n language file which stores the individual strings. */
export type TI18nFile = {
    [component: string]: {
        [key: string]: string;
    };
};

/** Type representing an i18n function generated by i18n factory function. */
export type TI18nFunc = (key: string) => string;
