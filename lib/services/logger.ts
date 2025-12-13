/**
 * Service de logging centralisé pour l'application
 * Permet de gérer les logs en développement et production
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

class Logger {
  private isDevelopment = __DEV__;

  /**
   * Log une information
   */
  info(message: string, data?: unknown): void {
    this.log("info", message, data);
  }

  /**
   * Log un avertissement
   */
  warn(message: string, data?: unknown): void {
    this.log("warn", message, data);
  }

  /**
   * Log une erreur
   */
  error(message: string, error?: unknown): void {
    this.log("error", message, error);

    // TODO: En production, envoyer à un service comme Sentry
    // if (!this.isDevelopment) {
    //   Sentry.captureException(error, { extra: { message } });
    // }
  }

  /**
   * Log de débogage (uniquement en dev)
   */
  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      this.log("debug", message, data);
    }
  }

  /**
   * Méthode privée pour logger
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    if (!this.isDevelopment && level === "debug") {
      return;
    }

    // En développement, utiliser console
    if (this.isDevelopment) {
      const logMethod =
        level === "error"
          ? console.error
          : level === "warn"
          ? console.warn
          : console.log; // eslint-disable-line no-console

      logMethod(`[${level.toUpperCase()}] ${message}`, data || "");
    }

    // TODO: En production, envoyer à un service de logging
    // else {
    //   this.sendToLoggingService(logEntry);
    // }
  }

  /**
   * TODO: Implémenter l'envoi vers un service externe
   */
  private sendToLoggingService(_entry: LogEntry): void {
    // Implémenter l'envoi vers CloudWatch, DataDog, etc.
  }
}

export const logger = new Logger();
