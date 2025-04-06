export const omitPassword = <T extends { password?: string }>(user: T) => {
    const { password, ...rest } = user;
    return rest;
  };