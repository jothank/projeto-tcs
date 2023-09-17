const MIME_TYPE_MAP: { [key: string]: string } = {
    pdf: 'application/pdf',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
  };
  
  export const convertBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
  
    export const getMimeByExt = (fileExtension: string) => {
      const lowerFileExtension = fileExtension.toLowerCase();
      return MIME_TYPE_MAP[lowerFileExtension];
    };
  
    export const getBlobUrl = (data: any, typeExpected?: string): string => {
      const mimeType = getMimeByExt(typeExpected ?? 'pdf');
      const blob = new Blob([data], { type: mimeType });
      return URL.createObjectURL(blob);
    };
  
  
  
    export const base64ToBlob = (base64 : string) => {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; ++i) {
        bytes[i] = binaryString.charCodeAt(i);
      }
    
      return new Blob([bytes], { type: 'application/pdf' });
    };
  
  
    export const base64ToUint8Array = (base64Data: string): Uint8Array => {
      return Uint8Array.from(window.atob(base64Data), c => c.charCodeAt(0));
    };