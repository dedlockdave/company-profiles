export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_abstains: {
        Row: {
          created_at: string
          name: string
          cheat_days: number
          id: string
        }
        Insert: {
          created_at?: string
          name: string
          cheat_days?: number
          id?: string
        }
        Update: {
          created_at?: string
          name?: string
          cheat_days?: number
          id?: string
        }
      }
      user_activities: {
        Row: {
          created_at: string | null
          name: string
          days: Json | null
          id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          name: string
          days?: Json | null
          id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          name?: string
          days?: Json | null
          id?: string | null
          user_id?: string
        }
      }
      user_consumes: {
        Row: {
          created_at: string
          name: string
          amount: number
          unit: string | null
          operator: string
          id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          name: string
          amount: number
          unit?: string | null
          operator: string
          id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          name?: string
          amount?: number
          unit?: string | null
          operator?: string
          id?: string | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
