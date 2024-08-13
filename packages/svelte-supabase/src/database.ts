export type Json =
  | { [key: string]: Json | undefined }
  | boolean
  | Json[]
  | null
  | number
  | string;

export type Database = {
  auth: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      aal_level: 'aal1' | 'aal2' | 'aal3';
      code_challenge_method: 'plain' | 's256';
      factor_status: 'unverified' | 'verified';
      factor_type: 'totp' | 'webauthn';
      one_time_token_type:
        | 'confirmation_token'
        | 'email_change_token_current'
        | 'email_change_token_new'
        | 'phone_change_token'
        | 'reauthentication_token'
        | 'recovery_token';
    };
    Functions: {
      email: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      jwt: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Tables: {
      audit_log_entries: {
        Insert: {
          created_at?: null | string;
          id: string;
          instance_id?: null | string;
          ip_address?: string;
          payload?: Json | null;
        };
        Relationships: [];
        Row: {
          created_at: null | string;
          id: string;
          instance_id: null | string;
          ip_address: string;
          payload: Json | null;
        };
        Update: {
          created_at?: null | string;
          id?: string;
          instance_id?: null | string;
          ip_address?: string;
          payload?: Json | null;
        };
      };
      flow_state: {
        Insert: {
          auth_code: string;
          auth_code_issued_at?: null | string;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database['auth']['Enums']['code_challenge_method'];
          created_at?: null | string;
          id: string;
          provider_access_token?: null | string;
          provider_refresh_token?: null | string;
          provider_type: string;
          updated_at?: null | string;
          user_id?: null | string;
        };
        Relationships: [];
        Row: {
          auth_code: string;
          auth_code_issued_at: null | string;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database['auth']['Enums']['code_challenge_method'];
          created_at: null | string;
          id: string;
          provider_access_token: null | string;
          provider_refresh_token: null | string;
          provider_type: string;
          updated_at: null | string;
          user_id: null | string;
        };
        Update: {
          auth_code?: string;
          auth_code_issued_at?: null | string;
          authentication_method?: string;
          code_challenge?: string;
          code_challenge_method?: Database['auth']['Enums']['code_challenge_method'];
          created_at?: null | string;
          id?: string;
          provider_access_token?: null | string;
          provider_refresh_token?: null | string;
          provider_type?: string;
          updated_at?: null | string;
          user_id?: null | string;
        };
      };
      identities: {
        Insert: {
          created_at?: null | string;
          email?: null | string;
          id?: string;
          identity_data: Json;
          last_sign_in_at?: null | string;
          provider: string;
          provider_id: string;
          updated_at?: null | string;
          user_id: string;
        };
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'identities_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          created_at: null | string;
          email: null | string;
          id: string;
          identity_data: Json;
          last_sign_in_at: null | string;
          provider: string;
          provider_id: string;
          updated_at: null | string;
          user_id: string;
        };
        Update: {
          created_at?: null | string;
          email?: null | string;
          id?: string;
          identity_data?: Json;
          last_sign_in_at?: null | string;
          provider?: string;
          provider_id?: string;
          updated_at?: null | string;
          user_id?: string;
        };
      };
      instances: {
        Insert: {
          created_at?: null | string;
          id: string;
          raw_base_config?: null | string;
          updated_at?: null | string;
          uuid?: null | string;
        };
        Relationships: [];
        Row: {
          created_at: null | string;
          id: string;
          raw_base_config: null | string;
          updated_at: null | string;
          uuid: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: string;
          raw_base_config?: null | string;
          updated_at?: null | string;
          uuid?: null | string;
        };
      };
      mfa_amr_claims: {
        Insert: {
          authentication_method: string;
          created_at: string;
          id: string;
          session_id: string;
          updated_at: string;
        };
        Relationships: [
          {
            columns: ['session_id'];
            foreignKeyName: 'mfa_amr_claims_session_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'sessions';
          }
        ];
        Row: {
          authentication_method: string;
          created_at: string;
          id: string;
          session_id: string;
          updated_at: string;
        };
        Update: {
          authentication_method?: string;
          created_at?: string;
          id?: string;
          session_id?: string;
          updated_at?: string;
        };
      };
      mfa_challenges: {
        Insert: {
          created_at: string;
          factor_id: string;
          id: string;
          ip_address: unknown;
          verified_at?: null | string;
        };
        Relationships: [
          {
            columns: ['factor_id'];
            foreignKeyName: 'mfa_challenges_auth_factor_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'mfa_factors';
          }
        ];
        Row: {
          created_at: string;
          factor_id: string;
          id: string;
          ip_address: unknown;
          verified_at: null | string;
        };
        Update: {
          created_at?: string;
          factor_id?: string;
          id?: string;
          ip_address?: unknown;
          verified_at?: null | string;
        };
      };
      mfa_factors: {
        Insert: {
          created_at: string;
          factor_type: Database['auth']['Enums']['factor_type'];
          friendly_name?: null | string;
          id: string;
          secret?: null | string;
          status: Database['auth']['Enums']['factor_status'];
          updated_at: string;
          user_id: string;
        };
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'mfa_factors_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          created_at: string;
          factor_type: Database['auth']['Enums']['factor_type'];
          friendly_name: null | string;
          id: string;
          secret: null | string;
          status: Database['auth']['Enums']['factor_status'];
          updated_at: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          factor_type?: Database['auth']['Enums']['factor_type'];
          friendly_name?: null | string;
          id?: string;
          secret?: null | string;
          status?: Database['auth']['Enums']['factor_status'];
          updated_at?: string;
          user_id?: string;
        };
      };
      one_time_tokens: {
        Insert: {
          created_at?: string;
          id: string;
          relates_to: string;
          token_hash: string;
          token_type: Database['auth']['Enums']['one_time_token_type'];
          updated_at?: string;
          user_id: string;
        };
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'one_time_tokens_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          created_at: string;
          id: string;
          relates_to: string;
          token_hash: string;
          token_type: Database['auth']['Enums']['one_time_token_type'];
          updated_at: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          relates_to?: string;
          token_hash?: string;
          token_type?: Database['auth']['Enums']['one_time_token_type'];
          updated_at?: string;
          user_id?: string;
        };
      };
      refresh_tokens: {
        Insert: {
          created_at?: null | string;
          id?: number;
          instance_id?: null | string;
          parent?: null | string;
          revoked?: boolean | null;
          session_id?: null | string;
          token?: null | string;
          updated_at?: null | string;
          user_id?: null | string;
        };
        Relationships: [
          {
            columns: ['session_id'];
            foreignKeyName: 'refresh_tokens_session_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'sessions';
          }
        ];
        Row: {
          created_at: null | string;
          id: number;
          instance_id: null | string;
          parent: null | string;
          revoked: boolean | null;
          session_id: null | string;
          token: null | string;
          updated_at: null | string;
          user_id: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: number;
          instance_id?: null | string;
          parent?: null | string;
          revoked?: boolean | null;
          session_id?: null | string;
          token?: null | string;
          updated_at?: null | string;
          user_id?: null | string;
        };
      };
      saml_providers: {
        Insert: {
          attribute_mapping?: Json | null;
          created_at?: null | string;
          entity_id: string;
          id: string;
          metadata_url?: null | string;
          metadata_xml: string;
          name_id_format?: null | string;
          sso_provider_id: string;
          updated_at?: null | string;
        };
        Relationships: [
          {
            columns: ['sso_provider_id'];
            foreignKeyName: 'saml_providers_sso_provider_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'sso_providers';
          }
        ];
        Row: {
          attribute_mapping: Json | null;
          created_at: null | string;
          entity_id: string;
          id: string;
          metadata_url: null | string;
          metadata_xml: string;
          name_id_format: null | string;
          sso_provider_id: string;
          updated_at: null | string;
        };
        Update: {
          attribute_mapping?: Json | null;
          created_at?: null | string;
          entity_id?: string;
          id?: string;
          metadata_url?: null | string;
          metadata_xml?: string;
          name_id_format?: null | string;
          sso_provider_id?: string;
          updated_at?: null | string;
        };
      };
      saml_relay_states: {
        Insert: {
          created_at?: null | string;
          flow_state_id?: null | string;
          for_email?: null | string;
          id: string;
          redirect_to?: null | string;
          request_id: string;
          sso_provider_id: string;
          updated_at?: null | string;
        };
        Relationships: [
          {
            columns: ['flow_state_id'];
            foreignKeyName: 'saml_relay_states_flow_state_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'flow_state';
          },
          {
            columns: ['sso_provider_id'];
            foreignKeyName: 'saml_relay_states_sso_provider_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'sso_providers';
          }
        ];
        Row: {
          created_at: null | string;
          flow_state_id: null | string;
          for_email: null | string;
          id: string;
          redirect_to: null | string;
          request_id: string;
          sso_provider_id: string;
          updated_at: null | string;
        };
        Update: {
          created_at?: null | string;
          flow_state_id?: null | string;
          for_email?: null | string;
          id?: string;
          redirect_to?: null | string;
          request_id?: string;
          sso_provider_id?: string;
          updated_at?: null | string;
        };
      };
      schema_migrations: {
        Insert: {
          version: string;
        };
        Relationships: [];
        Row: {
          version: string;
        };
        Update: {
          version?: string;
        };
      };
      sessions: {
        Insert: {
          aal?: Database['auth']['Enums']['aal_level'] | null;
          created_at?: null | string;
          factor_id?: null | string;
          id: string;
          ip?: null | unknown;
          not_after?: null | string;
          refreshed_at?: null | string;
          tag?: null | string;
          updated_at?: null | string;
          user_agent?: null | string;
          user_id: string;
        };
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'sessions_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          aal: Database['auth']['Enums']['aal_level'] | null;
          created_at: null | string;
          factor_id: null | string;
          id: string;
          ip: null | unknown;
          not_after: null | string;
          refreshed_at: null | string;
          tag: null | string;
          updated_at: null | string;
          user_agent: null | string;
          user_id: string;
        };
        Update: {
          aal?: Database['auth']['Enums']['aal_level'] | null;
          created_at?: null | string;
          factor_id?: null | string;
          id?: string;
          ip?: null | unknown;
          not_after?: null | string;
          refreshed_at?: null | string;
          tag?: null | string;
          updated_at?: null | string;
          user_agent?: null | string;
          user_id?: string;
        };
      };
      sso_domains: {
        Insert: {
          created_at?: null | string;
          domain: string;
          id: string;
          sso_provider_id: string;
          updated_at?: null | string;
        };
        Relationships: [
          {
            columns: ['sso_provider_id'];
            foreignKeyName: 'sso_domains_sso_provider_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'sso_providers';
          }
        ];
        Row: {
          created_at: null | string;
          domain: string;
          id: string;
          sso_provider_id: string;
          updated_at: null | string;
        };
        Update: {
          created_at?: null | string;
          domain?: string;
          id?: string;
          sso_provider_id?: string;
          updated_at?: null | string;
        };
      };
      sso_providers: {
        Insert: {
          created_at?: null | string;
          id: string;
          resource_id?: null | string;
          updated_at?: null | string;
        };
        Relationships: [];
        Row: {
          created_at: null | string;
          id: string;
          resource_id: null | string;
          updated_at: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: string;
          resource_id?: null | string;
          updated_at?: null | string;
        };
      };
      users: {
        Insert: {
          aud?: null | string;
          banned_until?: null | string;
          confirmation_sent_at?: null | string;
          confirmation_token?: null | string;
          confirmed_at?: null | string;
          created_at?: null | string;
          deleted_at?: null | string;
          email?: null | string;
          email_change?: null | string;
          email_change_confirm_status?: null | number;
          email_change_sent_at?: null | string;
          email_change_token_current?: null | string;
          email_change_token_new?: null | string;
          email_confirmed_at?: null | string;
          encrypted_password?: null | string;
          id: string;
          instance_id?: null | string;
          invited_at?: null | string;
          is_anonymous?: boolean;
          is_sso_user?: boolean;
          is_super_admin?: boolean | null;
          last_sign_in_at?: null | string;
          phone?: null | string;
          phone_change?: null | string;
          phone_change_sent_at?: null | string;
          phone_change_token?: null | string;
          phone_confirmed_at?: null | string;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          reauthentication_sent_at?: null | string;
          reauthentication_token?: null | string;
          recovery_sent_at?: null | string;
          recovery_token?: null | string;
          role?: null | string;
          updated_at?: null | string;
        };
        Relationships: [];
        Row: {
          aud: null | string;
          banned_until: null | string;
          confirmation_sent_at: null | string;
          confirmation_token: null | string;
          confirmed_at: null | string;
          created_at: null | string;
          deleted_at: null | string;
          email: null | string;
          email_change: null | string;
          email_change_confirm_status: null | number;
          email_change_sent_at: null | string;
          email_change_token_current: null | string;
          email_change_token_new: null | string;
          email_confirmed_at: null | string;
          encrypted_password: null | string;
          id: string;
          instance_id: null | string;
          invited_at: null | string;
          is_anonymous: boolean;
          is_sso_user: boolean;
          is_super_admin: boolean | null;
          last_sign_in_at: null | string;
          phone: null | string;
          phone_change: null | string;
          phone_change_sent_at: null | string;
          phone_change_token: null | string;
          phone_confirmed_at: null | string;
          raw_app_meta_data: Json | null;
          raw_user_meta_data: Json | null;
          reauthentication_sent_at: null | string;
          reauthentication_token: null | string;
          recovery_sent_at: null | string;
          recovery_token: null | string;
          role: null | string;
          updated_at: null | string;
        };
        Update: {
          aud?: null | string;
          banned_until?: null | string;
          confirmation_sent_at?: null | string;
          confirmation_token?: null | string;
          confirmed_at?: null | string;
          created_at?: null | string;
          deleted_at?: null | string;
          email?: null | string;
          email_change?: null | string;
          email_change_confirm_status?: null | number;
          email_change_sent_at?: null | string;
          email_change_token_current?: null | string;
          email_change_token_new?: null | string;
          email_confirmed_at?: null | string;
          encrypted_password?: null | string;
          id?: string;
          instance_id?: null | string;
          invited_at?: null | string;
          is_anonymous?: boolean;
          is_sso_user?: boolean;
          is_super_admin?: boolean | null;
          last_sign_in_at?: null | string;
          phone?: null | string;
          phone_change?: null | string;
          phone_change_sent_at?: null | string;
          phone_change_token?: null | string;
          phone_confirmed_at?: null | string;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          reauthentication_sent_at?: null | string;
          reauthentication_token?: null | string;
          recovery_sent_at?: null | string;
          recovery_token?: null | string;
          role?: null | string;
          updated_at?: null | string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
  finances: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      book: {
        Insert: {
          archived?: boolean | null;
          created_at?: string;
          created_by: string;
          id?: number;
          last_viewed?: string;
          name: string;
        };
        Relationships: [
          {
            columns: ['created_by'];
            foreignKeyName: 'book_created_by_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          archived: boolean | null;
          created_at: string;
          created_by: string;
          id: number;
          last_viewed: string;
          name: string;
        };
        Update: {
          archived?: boolean | null;
          created_at?: string;
          created_by?: string;
          id?: number;
          last_viewed?: string;
          name?: string;
        };
      };
      expense: {
        Insert: {
          amount: number;
          comment?: null | string;
          created_at?: string;
          created_by?: string;
          date: string;
          id?: number;
          page_id: number;
        };
        Relationships: [
          {
            columns: ['created_by'];
            foreignKeyName: 'expense_created_by_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
          {
            columns: ['page_id'];
            foreignKeyName: 'expense_page_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'page';
          }
        ];
        Row: {
          amount: number;
          comment: null | string;
          created_at: string;
          created_by: string;
          date: string;
          id: number;
          page_id: number;
        };
        Update: {
          amount?: number;
          comment?: null | string;
          created_at?: string;
          created_by?: string;
          date?: string;
          id?: number;
          page_id?: number;
        };
      };
      expenses_tags: {
        Insert: {
          expense_id: number;
          tag_id: number;
        };
        Relationships: [
          {
            columns: ['expense_id'];
            foreignKeyName: 'expenses_tags_expense_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'date_sorted_expenses';
          },
          {
            columns: ['expense_id'];
            foreignKeyName: 'expenses_tags_expense_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'expense';
          },
          {
            columns: ['tag_id'];
            foreignKeyName: 'expenses_tags_tag_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'tag';
          }
        ];
        Row: {
          expense_id: number;
          tag_id: number;
        };
        Update: {
          expense_id?: number;
          tag_id?: number;
        };
      };
      page: {
        Insert: {
          book_id: number;
          created_at?: string;
          created_by?: string;
          id?: number;
          name: string;
        };
        Relationships: [
          {
            columns: ['book_id'];
            foreignKeyName: 'page_book_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'book';
          },
          {
            columns: ['created_by'];
            foreignKeyName: 'page_created_by_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          book_id: number;
          created_at: string;
          created_by: string;
          id: number;
          name: string;
        };
        Update: {
          book_id?: number;
          created_at?: string;
          created_by?: string;
          id?: number;
          name?: string;
        };
      };
      pinned_pages: {
        Insert: {
          last_clicked?: null | string;
          page_id: number;
          user_id: string;
        };
        Relationships: [
          {
            columns: ['page_id'];
            foreignKeyName: 'pinned_pages_page_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'page';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'pinned_pages_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          last_clicked: null | string;
          page_id: number;
          user_id: string;
        };
        Update: {
          last_clicked?: null | string;
          page_id?: number;
          user_id?: string;
        };
      };
      tag: {
        Insert: {
          book_id: number;
          color: string;
          created_at?: string;
          id?: number;
          name: string;
        };
        Relationships: [
          {
            columns: ['book_id'];
            foreignKeyName: 'tag_book_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'book';
          }
        ];
        Row: {
          book_id: number;
          color: string;
          created_at: string;
          id: number;
          name: string;
        };
        Update: {
          book_id?: number;
          color?: string;
          created_at?: string;
          id?: number;
          name?: string;
        };
      };
      user_books: {
        Insert: {
          book_id: number;
          is_admin?: boolean;
          user_id: string;
        };
        Relationships: [
          {
            columns: ['book_id'];
            foreignKeyName: 'user_books_book_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'book';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'user_books_user_id_fkey';
            isOneToOne: true;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          book_id: number;
          is_admin: boolean;
          user_id: string;
        };
        Update: {
          book_id?: number;
          is_admin?: boolean;
          user_id?: string;
        };
      };
    };
    Views: {
      date_sorted_expenses: {
        Insert: {
          amount?: null | number;
          comment?: null | string;
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
        };
        Relationships: [
          {
            columns: ['created_by'];
            foreignKeyName: 'expense_created_by_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
          {
            columns: ['page_id'];
            foreignKeyName: 'expense_page_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'page';
          }
        ];
        Row: {
          amount: null | number;
          comment: null | string;
          created_at: null | string;
          created_by: null | string;
          date: null | string;
          id: null | number;
          page_id: null | number;
        };
        Update: {
          amount?: null | number;
          comment?: null | string;
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
        };
      };
    };
  };
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      user_data: {
        Insert: {
          first_name: string;
          id: string;
          last_name?: null | string;
        };
        Relationships: [
          {
            columns: ['id'];
            foreignKeyName: 'user_data_id_fkey';
            isOneToOne: true;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          first_name: string;
          id: string;
          last_name: null | string;
        };
        Update: {
          first_name?: string;
          id?: string;
          last_name?: null | string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | { schema: keyof Database }
    | keyof (PublicSchema['Tables'] & PublicSchema['Views']),
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | { schema: keyof Database }
    | keyof PublicSchema['Tables'],
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | { schema: keyof Database }
    | keyof PublicSchema['Tables'],
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | { schema: keyof Database }
    | keyof PublicSchema['Enums'],
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
