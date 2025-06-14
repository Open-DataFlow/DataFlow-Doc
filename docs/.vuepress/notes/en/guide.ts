import type { ThemeNote } from 'vuepress-theme-plume'
import { defineNoteConfig } from 'vuepress-theme-plume'

export const Guide: ThemeNote = defineNoteConfig({
    dir: 'guide',
    link: '/guide/',
    sidebar: [
        {
            text: 'Quick Start',
            collapsed: false,
            icon: 'carbon:idea',
            prefix: 'quickstart',
            items: [
                'install',
                // 'usage',
                // 'project-structure',
                // 'write',
                // 'blog',
                // 'document',
                // 'international',
                // 'deployment',
                // 'optimize-build',
            ],
        },
        {
            text: 'Write',
            icon: 'fluent-mdl2:edit-create',
            collapsed: false,
            items: [
                {
                    text: 'markdown',
                    icon: 'material-symbols:markdown-outline',
                    prefix: 'markdown',
                    collapsed: true,
                    items: [
                        'basic',
                        'extensions',
                        'icons',
                        'mark',
                        'plot',
                        'abbr',
                        'annotation',
                        'card',
                        'steps',
                        'file-tree',
                        'tabs',
                        'timeline',
                        'demo-wrapper',
                        'collapse',
                        'npm-to',
                        'caniuse',
                        'include',
                    ],
                },
            ],
        },
        {
            text: 'Customization',
            icon: 'material-symbols:dashboard-customize-outline-rounded',
            collapsed: false,
            prefix: 'custom',
            items: [
                'home',
                'style',
            ],
        },
    ],
})
