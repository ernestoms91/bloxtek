export const capitalizeName = (name: string) => {
    return name
      .split(" ") // Divide por los espacios en blanco para manejar nombres o apellidos compuestos
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) // Capitaliza cada palabra
      .join(" "); // Vuelve a unirlas
  };
  