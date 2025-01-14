export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  phone?: string;
  registration_date: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface UserJson {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  phone?: string;
  registration_date: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export function fromJson(json: UserJson): User {
  return {
    user_id: json.user_id,
    first_name: json.first_name,
    last_name: json.last_name,
    email: json.email,
    address: json.address,
    phone: json.phone,
    registration_date: json.registration_date,
    status: json.status,
    created_at: json.created_at,
    updated_at: json.updated_at,
  };
}

// Función para convertir desde un objeto Article a JSON
export function toJson(user: User): Record<string, unknown> {
  return {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    address: user.address,
    phone: user.phone,
    registration_date: user.registration_date,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
