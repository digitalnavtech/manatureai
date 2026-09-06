type ClassValue = string | number | null | undefined | false | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (val: ClassValue) => {
    if (!val) return;
    if (Array.isArray(val)) {
      val.forEach(walk);
      return;
    }
    out.push(String(val));
  };

  inputs.forEach(walk);
  return out.join(" ");
}
