import AIDE_SUCCESS_GIF from 'assets/aide/gif/esdes-no-prep.gif'
import AIDE_LOADING_GIF from 'assets/aide/gif/jojo-loader.gif'
import AIDE_ERROR_GIF from 'assets/aide/gif/500-error.gif'

import GLOVO_SUCCESS_GIF from 'assets/glovo/gif/dance.gif'
import GLOVO_LOADING_GIF from 'assets/glovo/gif/moto.gif'
import GLOVO_ERROR_GIF from 'assets/glovo/gif/logo.gif'

interface IGifByStatus {
    gif: string
    size: string
}

interface IGifs {
    success: IGifByStatus
    loading: IGifByStatus
    error: IGifByStatus
}

interface IFormBackGrounds {
    aide: IGifs
    glovo: IGifs
}

const FormBackGrounds: IFormBackGrounds = {
    aide: {
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
    glovo: {
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
}

// const AideGifs: IGifs = {
//     success: {
//         gif: AIDE_SUCCESS_GIF,
//         size: '3.5em',
//     },
//     loading: {
//         gif: AIDE_LOADING_GIF,
//         size: '20%',
//     },
//     error: {
//         gif: AIDE_ERROR_GIF,
//         size: '',
//     },
// }

// const GlovoGifs: IGifs = {
//     success: {
//         gif: GLOVO_SUCCESS_GIF,
//         size: '3.5em',
//     },
//     loading: {
//         gif: GLOVO_LOADING_GIF,
//         size: '14em',
//     },
//     error: {
//         gif: GLOVO_ERROR_GIF,
//         size: '2.5em',
//     },
// }

export { FormBackGrounds }
