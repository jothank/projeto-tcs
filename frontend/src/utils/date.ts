export function formatDate(data: any) {
  if (data === null || data === undefined) return undefined;
  const partes = data.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}
