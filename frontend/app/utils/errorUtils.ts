/**
 * map of codes that server returns in its response in case of error
 * to client readable version
 */
const errorMessageForCodes = new Map([
  [0, 'Algo salió mal. Por favor intente nuevamente un poco más tarde.'],
  [1, 'El comentario no se puede encontrar. Actualice la página e intente nuevamente.'],
  [2, 'No se pudo ordenar la solicitud entrante.'],
  [3, 'No tiene permiso para esta operación.'],
  [4, 'Datos de comentario inválidos'],
  [5, 'El comentario no se puede encontrar. Actualice la página e intente nuevamente.'],
  [6, 'El sitio no se puede encontrar. Actualice la página e intente nuevamente.'],
  [7, 'El usuario ha sido bloqueado.'],
  [8, 'Esta publicación es de solo lectura.'],
  [9, 'El cambio de comentario falló. Por favor intente nuevamente un poco más tarde.'],
  [10, 'Es muy tarde para editar el comentario.'],
  [11, 'El comentario ya tiene respuesta, la edición no es posible.'],
  [12, 'No se puede guardar el resultado de la votación. Por favor intente nuevamente un poco más tarde.'],
  [13, 'No puede votar por su propio comentario.'],
  [14, 'Ya ha votado por el comentario.'],
  [15, 'Demasiados votos para el comentario.'],
  [16, 'Puntaje mínimo alcanzado para el comentario.'],
  [17, 'Acción rechazada. Por favor intente nuevamente un poco más tarde.'],
  [18, 'No se puede encontrar el archivo solicitado.'],
]);

/**
 * map of http rest codes to ui label, used by fetcher to generate error with `-1` code
 */
export const httpErrorMap = new Map([
  [401, 'No autorizado.'],
  [403, 'Prohibido.'],
  [429, 'Has alcanzado el límite de solicitud máximo.'],
]);

export type FetcherError =
  | string
  | {
      /**
       * Error code, that is part of server error response.
       *
       * Note that -1 is reserved for error where `error` field shall be used directly
       */
      code?: number;
      details?: string;
      error: string;
    };

export function extractErrorMessageFromResponse(response: FetcherError): string {
  const defaultErrorMessage = errorMessageForCodes.get(0) as string;

  if (!response) {
    return defaultErrorMessage;
  }

  if (typeof response === 'string') {
    return response;
  }

  if (response.code === -1) {
    return response.error;
  }

  if (typeof response.details === 'string') {
    return response.details.charAt(0).toUpperCase() + response.details.substring(1);
  }

  if (typeof response.code === 'number' && errorMessageForCodes.has(response.code)) {
    return errorMessageForCodes.get(response.code)!;
  }

  return defaultErrorMessage;
}
