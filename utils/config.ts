// utils/config.ts

import { useState, useEffect } from "preact/hooks";

export const TORNEO_CONFIG = {
  // 15 de Enero 2026, 08:00:00 hora local Argentina
  fechaInicio: new Date("2026-01-15T08:00:00-03:00").getTime(),
  fechaFin: new Date("2026-01-31T23:59:59-03:00").getTime(),
  textos: {
    antes: "El torneo empieza en",
    terminado: "El torneo terminó, muchas gracias por participar",
    ultimoDia: "Último día del torneo"
  }
};

export const useTorneoStatus = () => {
  const [status, setStatus] = useState({
    isLive: Date.now() >= TORNEO_CONFIG.fechaInicio,
    isFinished: Date.now() >= TORNEO_CONFIG.fechaFin
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = Date.now();
      const newLive = ahora >= TORNEO_CONFIG.fechaInicio;
      const newFinished = ahora >= TORNEO_CONFIG.fechaFin;

      setStatus(prev => {
        if (prev.isLive !== newLive || prev.isFinished !== newFinished) {
          return { isLive: newLive, isFinished: newFinished };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return status;
};