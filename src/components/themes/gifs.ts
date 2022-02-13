import AIDE_SUCCESS_GIF from 'assets/aide/gif/esdes-no-prep.gif'
import AIDE_LOADING_GIF from 'assets/aide/gif/jojo-loader.gif'
import AIDE_ERROR_GIF from 'assets/aide/gif/500-error.gif'

import GLOVO_SUCCESS_GIF from 'assets/glovo/gif/dance.gif'
import GLOVO_LOADING_GIF from 'assets/glovo/gif/moto.gif'
import GLOVO_ERROR_GIF from 'assets/glovo/gif/logo.gif'

import AIDE_GREETING_GIF from 'assets/aide/gif/madara-naruto.gif'

interface IGif {
    gif: string
    size: string
}

interface IGifs {
    status: {
        success: IGif
        loading: IGif
        error: IGif
    }
    greeting: IGif
}

interface IThemeGif {
    aide: IGifs
    glovo: IGifs
}

const ThemeGif: IThemeGif = {
    aide: {
        status: {
            success: {
                gif: `url(${AIDE_SUCCESS_GIF})`,
                size: '3.5em',
            },
            loading: {
                gif: `url(${AIDE_LOADING_GIF})`,
                size: '20%',
            },
            error: {
                gif: `url(${AIDE_ERROR_GIF})`,

                size: '',
            },
        },
        greeting: {
            gif: AIDE_GREETING_GIF,
            size: '',
        },
    },
    glovo: {
        status: {
            success: {
                gif: `url(${GLOVO_SUCCESS_GIF})`,
                size: '3.5em',
            },
            loading: {
                gif: `url(${GLOVO_LOADING_GIF})`,
                size: '14em',
            },
            error: {
                gif: `url(${GLOVO_ERROR_GIF})`,
                size: '2.5em',
            },
        },
        greeting: {
            gif: GLOVO_ERROR_GIF,
            size: '',
        },
    },
}

export { ThemeGif }
