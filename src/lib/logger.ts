// Logger JSON satu baris per event. Format ini mudah dibaca manusia
// sekaligus mudah di-parse oleh platform log (Loki, CloudWatch, dan sejenisnya).
type LogLevel = 'info' | 'warn' | 'error';
type LogMeta = Record<string, unknown>;
function write(level: LogLevel, msg: string, meta?: LogMeta) {
    const entry = { level, msg, ts: new Date().toISOString(), ...meta };
    const line = JSON.stringify(entry);
    if (level === 'error') console.error(line);
    else console.log(line);
}
export const logger = {
    info: (msg: string, meta?: LogMeta) => write('info', msg, meta),
    warn: (msg: string, meta?: LogMeta) => write('warn', msg, meta),
    error: (msg: string, meta?: LogMeta) => write('error', msg, meta),
};