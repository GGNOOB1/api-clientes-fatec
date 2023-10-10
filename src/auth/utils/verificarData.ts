import { DateTime } from 'luxon';

export default function verificarData(data) {
  const dataHoraUtc = DateTime.fromISO(data, {
    zone: 'utc',
  });
  const zonaHorarioBrasilia = 'America/Sao_Paulo';

  const dataHoraBrasilia = dataHoraUtc.setZone(zonaHorarioBrasilia);
  const dataHoraAtualBrasilia = DateTime.now().setZone(zonaHorarioBrasilia);

  const expirada = dataHoraBrasilia < dataHoraAtualBrasilia;

  // Se expirada for true quer dizer que a data expirou
  if (expirada) {
    throw new Error('Token de recuperação de senha expirado');
  }

  return true;
}
