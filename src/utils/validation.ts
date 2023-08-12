function isAllCharsEquals(value: string): boolean {
    const c: string = value.charAt(0);
    let iguais = true;
  
    for (let i = 0; i < value.length; i++) {
      iguais = iguais && value.charAt(i) === c;
    }
    return iguais;
  }
  
  export function isCnpj(value: string): boolean {
    let result = false;
    if (value && value.trim().length === 14) {
      const cnpj = value.trim();
      if (!isAllCharsEquals(cnpj)) {
        let soma = 0;
        let dig: number;
  
        let cnpjCalculado: string = cnpj.substring(0, 12);
        let aux: number;
  
        for (let i = 0; i < 4; i++) {
          aux = cnpj.charCodeAt(i) - 48;
  
          if (aux >= 0 && aux <= 9) {
            soma += aux * (6 - (i + 1));
          }
        }
  
        for (let i = 0; i < 8; i++) {
          aux = cnpj.charCodeAt(i + 4) - 48;
  
          if (aux >= 0 && aux <= 9) {
            soma += aux * (10 - (i + 1));
          }
        }
  
        dig = 11 - (soma % 11);
  
        cnpjCalculado += dig >= 10 ? '0' : dig.toString();
  
        soma = 0;
        for (let i = 0; i < 5; i++) {
          aux = cnpj.charCodeAt(i) - 48;
  
          if (aux >= 0 && aux <= 9) {
            soma += aux * (7 - (i + 1));
          }
        }
  
        for (let i = 0; i < 8; i++) {
          aux = cnpj.charCodeAt(i + 5) - 48;
  
          if (aux >= 0 && aux <= 9) {
            soma += aux * (10 - (i + 1));
          }
        }
  
        dig = 11 - (soma % 11);
        cnpjCalculado += dig >= 10 ? '0' : dig.toString();
  
        result = cnpj === cnpjCalculado;
      }
    }
    return result;
  }
  
  export function isCpf(value: string): boolean {
    let result = false;
    if (value && value.trim().length === 11) {
      const cpf = value.trim();
      if (!isAllCharsEquals(cpf)) {
        let d1 = 0;
        let d2 = 0;
        for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
          const digitoCPF = Number(cpf.substring(nCount - 1, nCount));
          d1 += (11 - nCount) * digitoCPF;
          d2 += (12 - nCount) * digitoCPF;
        }
        let resto = d1 % 11;
        const digito1 = resto < 2 ? 0 : 11 - resto;
        d2 += 2 * digito1;
        resto = d2 % 11;
        const digito2 = resto < 2 ? 0 : 11 - resto;
        const nDigVerific: string = cpf.substring(cpf.length - 2, cpf.length);
        const nDigResult = `${digito1}${digito2}`;
        result = nDigVerific === nDigResult;
      }
    }
    return result;
  }
  
  export function isCpfOrCnpj(value: string): boolean {
    return isCpf(value) || isCnpj(value);
  }
  
  export function isEmpty(value: any): boolean {
    return !value || (typeof value === 'string' && value.trim() === '');
  }
  
  export function isNumberEmpty(value: number | null | undefined): boolean {
    return !(value || value === 0);
  }
  
  export const isNullOrEmpty = (_array: any[]) => {
    return _array === null || _array === undefined || _array.length <= 0;
  };
  
  export const hasAnyNull = (values: unknown[]): boolean => {
    let result = false;
    if (!isNullOrEmpty(values)) {
      result = values.some(item => item === null);
    }
    return result;
  };
  
  export const hasRouteRolePermission = (
    rolePermissions: string[],
    routePermission: string,
  ): boolean => {
    let result = false;
    if (!isNullOrEmpty(rolePermissions) && !isEmpty(routePermission)) {
      result = rolePermissions.some(item => item === routePermission);
    }
    return result;
  };
  
  export const checkPermissionRole = (
    routePermission: string,
    currentRolePermissions: any[] | undefined,
  ): boolean => {
    let hasPermission = false;
    if (currentRolePermissions && !isNullOrEmpty(currentRolePermissions)) {
      hasPermission =
        hasRouteRolePermission(currentRolePermissions, routePermission) ||
        routePermission === 'default';
    }
    return hasPermission;
  };
  