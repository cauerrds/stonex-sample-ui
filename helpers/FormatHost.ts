export function FormatHost(host: string): string {
    const isValidHostname = /^[a-zA-Z0-9.-]+(:\d+)?$/.test(host);
    if (isValidHostname) {
        if (host.toLowerCase().includes('localhost')) {
            return `http://${host}`;
        } else {
            return `https://${host}`;
        }
    } else {
        return host;
    }
}