import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** Design tokens — colors from resources/css/design-tokens.css */
const designTokenColors = {
    primary: {
        100: '#f3eef2',
        200: '#cdbac7',
        300: '#b398ac',
        400: '#9a7590',
        500: '#815374',
        600: '#67425d',
        700: '#4d3246',
        800: '#34212e',
    },
    secondary: {
        100: '#dbe7e8',
        200: '#b8cfd2',
        300: '#94b6bb',
        400: '#719ea5',
        500: '#4d868e',
        600: '#3e6b72',
        700: '#2e5055',
        800: '#1f3639',
    },
    success: {
        100: '#dcede7',
        200: '#b8dbce',
        300: '#95cab6',
        400: '#71b89d',
        500: '#4ea685',
        600: '#3e856a',
        700: '#2f6450',
        800: '#1f4235',
    },
    warning: {
        100: '#fff4d4',
        200: '#ffe8a9',
        300: '#ffdd7d',
        400: '#ffd152',
        500: '#ffc627',
        600: '#cc9e1f',
        700: '#997717',
        800: '#664f10',
    },
    danger: {
        100: '#f8e9e9',
        200: '#e3a6a6',
        300: '#d47979',
        400: '#c64d4d',
        500: '#b82020',
        600: '#931a1a',
        700: '#6e1313',
        800: '#4a0d0d',
    },
    info: {
        100: '#e6f3fa',
        200: '#9acee9',
        300: '#67b5dd',
        400: '#359dd2',
        500: '#0284c7',
        600: '#026a9f',
        700: '#014f77',
        800: '#013550',
    },
    black: {
        100: '#e7e6e6',
        200: '#9d9a9a',
        300: '#6c6768',
        400: '#3b3535',
        500: '#0a0203',
    },
    custom: {
        silver: '#a7a7a7',
        neutral: '#fff8f3',
    },
};

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                display: ['Oswald', ...defaultTheme.fontFamily.sans],
                poppins: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                ...designTokenColors,
                gv: {
                    ink: '#070b12',
                    'ink-soft': '#101820',
                    navy: '#0c1b33',
                    blue: '#1e4d9c',
                    'blue-bright': '#2f6fd1',
                    'blue-deep': '#14356e',
                    steel: '#8b95a5',
                    chrome: '#c9d4e8',
                    mist: '#d5dbe6',
                    paper: '#f0f3f7',
                    slate: '#5a6472',
                },
            },
            keyframes: {
                rise: {
                    '0%': { opacity: '0', transform: 'translateY(18px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                rise: 'rise 0.8s ease-out both',
                'rise-delay': 'rise 0.8s ease-out 0.15s both',
                'rise-delay-2': 'rise 0.8s ease-out 0.3s both',
                'fade-in': 'fade-in 1s ease-out both',
            },
            fontSize: {
                'ui-h1': ['48px', { lineHeight: '54px' }],
                'ui-h2': ['40px', { lineHeight: '48px' }],
                'ui-h3': ['32px', { lineHeight: '40px' }],
                'ui-h4': ['32px', { lineHeight: '40px' }],
                'ui-h5': ['28px', { lineHeight: '36px' }],
                'ui-h6': ['24px', { lineHeight: '30px' }],
                'ui-p': ['16px', { lineHeight: '22px' }],
                'ui-label': ['14px', { lineHeight: '18px' }],
                'ui-small': ['12px', { lineHeight: '16px' }],
                'ui-xsmall': ['10px', { lineHeight: '14px' }],
            },
            letterSpacing: {
                'ui-tight': '0.02em',
                'ui-normal': '0.03em',
                'ui-wide': '0.05em',
            },
            fontWeight: {
                'ui-light': '300',
                'ui-regular': '400',
                'ui-medium': '500',
                'ui-semibold': '600',
                'ui-bold': '700',
            },
        },
    },

    plugins: [forms],
};
