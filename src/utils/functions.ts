import { addDays, isAfter, isBefore, parse } from 'date-fns';

/**
 * Verifica si horaActual está dentro del rango horainicio - horafin
 *
 * @param horainicio - string formato 'HH:mm:ss'
 * @param horafin - string formato 'HH:mm:ss'
 * @param horaActual - Date (momento actual)
 * @returns boolean
 */
export function estaDentroDelHorario(
  horainicio: string,
  horafin: string,
  horaActual: Date,
): boolean {
  const hoy = horaActual;
  const apertura = parse(horainicio, 'HH:mm:ss', hoy);
  let cierre = parse(horafin, 'HH:mm:ss', hoy);

  // Si el cierre es después de medianoche
  if (isBefore(cierre, apertura)) {
    cierre = addDays(cierre, 1);
  }

  return isAfter(horaActual, apertura) && isBefore(horaActual, cierre);
}
