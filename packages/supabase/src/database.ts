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
      [_ in never]: never
    };
    Functions: {
      role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      email: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      jwt: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      aal_level: 'aal1' | 'aal2' | 'aal3';
      code_challenge_method: 'plain' | 's256';
      factor_status: 'unverified' | 'verified';
      factor_type: 'phone' | 'totp' | 'webauthn';
      one_time_token_type:
        | 'confirmation_token'
        | 'email_change_token_current'
        | 'email_change_token_new'
        | 'phone_change_token'
        | 'reauthentication_token'
        | 'recovery_token';
    };
    Tables: {
      audit_log_entries: {
        Relationships: [];
        Row: {
          created_at: null | string;
          id: string;
          instance_id: null | string;
          ip_address: string;
          payload: Json | null;
        };
        Insert: {
          id: string;
          created_at?: null | string;
          instance_id?: null | string;
          ip_address?: string;
          payload?: Json | null;
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
        Relationships: [];
        Row: {
          created_at: null | string;
          id: string;
          updated_at: null | string;
          user_id: null | string;
          auth_code: string;
          auth_code_issued_at: null | string;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database['auth']['Enums']['code_challenge_method'];
          provider_access_token: null | string;
          provider_refresh_token: null | string;
          provider_type: string;
        };
        Insert: {
          id: string;
          auth_code: string;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database['auth']['Enums']['code_challenge_method'];
          provider_type: string;
          created_at?: null | string;
          updated_at?: null | string;
          user_id?: null | string;
          auth_code_issued_at?: null | string;
          provider_access_token?: null | string;
          provider_refresh_token?: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: string;
          updated_at?: null | string;
          user_id?: null | string;
          auth_code?: string;
          auth_code_issued_at?: null | string;
          authentication_method?: string;
          code_challenge?: string;
          code_challenge_method?: Database['auth']['Enums']['code_challenge_method'];
          provider_access_token?: null | string;
          provider_refresh_token?: null | string;
          provider_type?: string;
        };
      };
      mfa_factors: {
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
          friendly_name: null | string;
          id: string;
          last_challenged_at: null | string;
          secret: null | string;
          status: Database['auth']['Enums']['factor_status'];
          updated_at: string;
          user_id: string;
          factor_type: Database['auth']['Enums']['factor_type'];
          phone: null | string;
        };
        Insert: {
          created_at: string;
          id: string;
          status: Database['auth']['Enums']['factor_status'];
          updated_at: string;
          user_id: string;
          factor_type: Database['auth']['Enums']['factor_type'];
          friendly_name?: null | string;
          last_challenged_at?: null | string;
          secret?: null | string;
          phone?: null | string;
        };
        Update: {
          created_at?: string;
          friendly_name?: null | string;
          id?: string;
          last_challenged_at?: null | string;
          secret?: null | string;
          status?: Database['auth']['Enums']['factor_status'];
          updated_at?: string;
          user_id?: string;
          factor_type?: Database['auth']['Enums']['factor_type'];
          phone?: null | string;
        };
      };
      one_time_tokens: {
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
          updated_at: string;
          user_id: string;
          relates_to: string;
          token_hash: string;
          token_type: Database['auth']['Enums']['one_time_token_type'];
        };
        Insert: {
          id: string;
          user_id: string;
          relates_to: string;
          token_hash: string;
          token_type: Database['auth']['Enums']['one_time_token_type'];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          updated_at?: string;
          user_id?: string;
          relates_to?: string;
          token_hash?: string;
          token_type?: Database['auth']['Enums']['one_time_token_type'];
        };
      };
      refresh_tokens: {
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
          updated_at: null | string;
          user_id: null | string;
          revoked: boolean | null;
          session_id: null | string;
          token: null | string;
        };
        Insert: {
          created_at?: null | string;
          id?: number;
          instance_id?: null | string;
          parent?: null | string;
          updated_at?: null | string;
          user_id?: null | string;
          revoked?: boolean | null;
          session_id?: null | string;
          token?: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: number;
          instance_id?: null | string;
          parent?: null | string;
          updated_at?: null | string;
          user_id?: null | string;
          revoked?: boolean | null;
          session_id?: null | string;
          token?: null | string;
        };
      };
      saml_providers: {
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
          updated_at: null | string;
          name_id_format: null | string;
          sso_provider_id: string;
        };
        Insert: {
          entity_id: string;
          id: string;
          metadata_xml: string;
          sso_provider_id: string;
          attribute_mapping?: Json | null;
          created_at?: null | string;
          metadata_url?: null | string;
          updated_at?: null | string;
          name_id_format?: null | string;
        };
        Update: {
          attribute_mapping?: Json | null;
          created_at?: null | string;
          entity_id?: string;
          id?: string;
          metadata_url?: null | string;
          metadata_xml?: string;
          updated_at?: null | string;
          name_id_format?: null | string;
          sso_provider_id?: string;
        };
      };
      schema_migrations: {
        Relationships: [];
        Row: {
          version: string;
        };
        Insert: {
          version: string;
        };
        Update: {
          version?: string;
        };
      };
      sessions: {
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
          id: string;
          ip: null | unknown;
          refreshed_at: null | string;
          tag: null | string;
          updated_at: null | string;
          user_agent: null | string;
          user_id: string;
          factor_id: null | string;
          not_after: null | string;
        };
        Insert: {
          id: string;
          user_id: string;
          aal?: Database['auth']['Enums']['aal_level'] | null;
          created_at?: null | string;
          ip?: null | unknown;
          refreshed_at?: null | string;
          tag?: null | string;
          updated_at?: null | string;
          user_agent?: null | string;
          factor_id?: null | string;
          not_after?: null | string;
        };
        Update: {
          aal?: Database['auth']['Enums']['aal_level'] | null;
          created_at?: null | string;
          id?: string;
          ip?: null | unknown;
          refreshed_at?: null | string;
          tag?: null | string;
          updated_at?: null | string;
          user_agent?: null | string;
          user_id?: string;
          factor_id?: null | string;
          not_after?: null | string;
        };
      };
      sso_domains: {
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
          id: string;
          updated_at: null | string;
          domain: string;
          sso_provider_id: string;
        };
        Insert: {
          id: string;
          domain: string;
          sso_provider_id: string;
          created_at?: null | string;
          updated_at?: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: string;
          updated_at?: null | string;
          domain?: string;
          sso_provider_id?: string;
        };
      };
      sso_providers: {
        Relationships: [];
        Row: {
          created_at: null | string;
          id: string;
          updated_at: null | string;
          resource_id: null | string;
        };
        Insert: {
          id: string;
          created_at?: null | string;
          updated_at?: null | string;
          resource_id?: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: string;
          updated_at?: null | string;
          resource_id?: null | string;
        };
      };
      identities: {
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
          updated_at: null | string;
          user_id: string;
          provider: string;
          provider_id: string;
        };
        Insert: {
          identity_data: Json;
          user_id: string;
          provider: string;
          provider_id: string;
          created_at?: null | string;
          email?: null | string;
          id?: string;
          last_sign_in_at?: null | string;
          updated_at?: null | string;
        };
        Update: {
          created_at?: null | string;
          email?: null | string;
          id?: string;
          identity_data?: Json;
          last_sign_in_at?: null | string;
          updated_at?: null | string;
          user_id?: string;
          provider?: string;
          provider_id?: string;
        };
      };
      instances: {
        Relationships: [];
        Row: {
          created_at: null | string;
          id: string;
          updated_at: null | string;
          uuid: null | string;
          raw_base_config: null | string;
        };
        Insert: {
          id: string;
          created_at?: null | string;
          updated_at?: null | string;
          uuid?: null | string;
          raw_base_config?: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: string;
          updated_at?: null | string;
          uuid?: null | string;
          raw_base_config?: null | string;
        };
      };
      mfa_amr_claims: {
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
          created_at: string;
          id: string;
          updated_at: string;
          authentication_method: string;
          session_id: string;
        };
        Insert: {
          created_at: string;
          id: string;
          updated_at: string;
          authentication_method: string;
          session_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          updated_at?: string;
          authentication_method?: string;
          session_id?: string;
        };
      };
      mfa_challenges: {
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
          id: string;
          ip_address: unknown;
          verified_at: null | string;
          factor_id: string;
          otp_code: null | string;
        };
        Insert: {
          created_at: string;
          id: string;
          ip_address: unknown;
          factor_id: string;
          verified_at?: null | string;
          otp_code?: null | string;
        };
        Update: {
          created_at?: string;
          id?: string;
          ip_address?: unknown;
          verified_at?: null | string;
          factor_id?: string;
          otp_code?: null | string;
        };
      };
      saml_relay_states: {
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
          id: string;
          request_id: string;
          updated_at: null | string;
          flow_state_id: null | string;
          for_email: null | string;
          redirect_to: null | string;
          sso_provider_id: string;
        };
        Insert: {
          id: string;
          request_id: string;
          sso_provider_id: string;
          created_at?: null | string;
          updated_at?: null | string;
          flow_state_id?: null | string;
          for_email?: null | string;
          redirect_to?: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: string;
          request_id?: string;
          updated_at?: null | string;
          flow_state_id?: null | string;
          for_email?: null | string;
          redirect_to?: null | string;
          sso_provider_id?: string;
        };
      };
      users: {
        Relationships: [];
        Row: {
          aud: null | string;
          banned_until: null | string;
          created_at: null | string;
          deleted_at: null | string;
          email: null | string;
          email_change: null | string;
          email_change_sent_at: null | string;
          id: string;
          instance_id: null | string;
          invited_at: null | string;
          is_super_admin: boolean | null;
          last_sign_in_at: null | string;
          raw_app_meta_data: Json | null;
          raw_user_meta_data: Json | null;
          updated_at: null | string;
          confirmation_sent_at: null | string;
          confirmation_token: null | string;
          confirmed_at: null | string;
          email_change_confirm_status: null | number;
          email_change_token_current: null | string;
          email_change_token_new: null | string;
          email_confirmed_at: null | string;
          encrypted_password: null | string;
          is_anonymous: boolean;
          is_sso_user: boolean;
          phone: null | string;
          phone_change: null | string;
          phone_change_sent_at: null | string;
          phone_change_token: null | string;
          phone_confirmed_at: null | string;
          reauthentication_sent_at: null | string;
          reauthentication_token: null | string;
          recovery_sent_at: null | string;
          recovery_token: null | string;
          role: null | string;
        };
        Insert: {
          id: string;
          aud?: null | string;
          banned_until?: null | string;
          created_at?: null | string;
          deleted_at?: null | string;
          email?: null | string;
          email_change?: null | string;
          email_change_sent_at?: null | string;
          instance_id?: null | string;
          invited_at?: null | string;
          is_super_admin?: boolean | null;
          last_sign_in_at?: null | string;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          updated_at?: null | string;
          confirmation_sent_at?: null | string;
          confirmation_token?: null | string;
          confirmed_at?: null | string;
          email_change_confirm_status?: null | number;
          email_change_token_current?: null | string;
          email_change_token_new?: null | string;
          email_confirmed_at?: null | string;
          encrypted_password?: null | string;
          is_anonymous?: boolean;
          is_sso_user?: boolean;
          phone?: null | string;
          phone_change?: null | string;
          phone_change_sent_at?: null | string;
          phone_change_token?: null | string;
          phone_confirmed_at?: null | string;
          reauthentication_sent_at?: null | string;
          reauthentication_token?: null | string;
          recovery_sent_at?: null | string;
          recovery_token?: null | string;
          role?: null | string;
        };
        Update: {
          aud?: null | string;
          banned_until?: null | string;
          created_at?: null | string;
          deleted_at?: null | string;
          email?: null | string;
          email_change?: null | string;
          email_change_sent_at?: null | string;
          id?: string;
          instance_id?: null | string;
          invited_at?: null | string;
          is_super_admin?: boolean | null;
          last_sign_in_at?: null | string;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          updated_at?: null | string;
          confirmation_sent_at?: null | string;
          confirmation_token?: null | string;
          confirmed_at?: null | string;
          email_change_confirm_status?: null | number;
          email_change_token_current?: null | string;
          email_change_token_new?: null | string;
          email_confirmed_at?: null | string;
          encrypted_password?: null | string;
          is_anonymous?: boolean;
          is_sso_user?: boolean;
          phone?: null | string;
          phone_change?: null | string;
          phone_change_sent_at?: null | string;
          phone_change_token?: null | string;
          phone_confirmed_at?: null | string;
          reauthentication_sent_at?: null | string;
          reauthentication_token?: null | string;
          recovery_sent_at?: null | string;
          recovery_token?: null | string;
          role?: null | string;
        };
      };
    };
    Views: {
      [_ in never]: never
    };
  };
  finances: {
    CompositeTypes: {
      [_ in never]: never
    };
    Functions: {
      log_last_accessed_page: {
        Returns: undefined;
        Args: {
          page: number;
        };
      };
      create_budget_plan: {
        Returns: Json;
        Args: {
          name: string;
          allocations: Json;
          total_income: number;
        };
      };
      set_active_plan: {
        Returns: undefined;
        Args: {
          plan_id: number;
        };
      };
      update_budget_plan: {
        Returns: Json;
        Args: {
          plan_id: number;
          plan_name: string;
          allocations: Json;
          plan_total_income: number;
        };
      };
    };
    Enums: {
      [_ in never]: never
    };
    Tables: {
      book: {
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
        Insert: {
          name: string;
          archived?: boolean | null;
          created_at?: string;
          created_by?: string;
          id?: number;
          last_viewed?: string;
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
      budget_allocation: {
        Relationships: [
          {
            columns: ['budget_plan_id'];
            foreignKeyName: 'budget_allocation_budget_plan_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'budget_plan';
          }
        ];
        Row: {
          budget_plan_id: number;
          id: number;
          name: string;
          percentage: null | number;
          amount: null | number;
        };
        Insert: {
          budget_plan_id: number;
          name: string;
          id?: number;
          percentage?: null | number;
          amount?: null | number;
        };
        Update: {
          budget_plan_id?: number;
          id?: number;
          name?: string;
          percentage?: null | number;
          amount?: null | number;
        };
      };
      preset_budget_allocation: {
        Relationships: [
          {
            columns: ['preset_plan_id'];
            foreignKeyName: 'preset_budget_allocation_preset_plan_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'preset_budget_plan';
          }
        ];
        Row: {
          id: number;
          name: string;
          percentage: null | number;
          preset_plan_id: number;
          amount: null | number;
        };
        Insert: {
          name: string;
          preset_plan_id: number;
          id?: number;
          percentage?: null | number;
          amount?: null | number;
        };
        Update: {
          id?: number;
          name?: string;
          percentage?: null | number;
          preset_plan_id?: number;
          amount?: null | number;
        };
      };
      subscriptions: {
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'fk_user_id';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          created_at: null | string;
          id: number;
          name: string;
          payment_interval: string;
          user_id: string;
          amount: number;
        };
        Insert: {
          name: string;
          payment_interval: string;
          amount: number;
          created_at?: null | string;
          id?: never;
          user_id?: string;
        };
        Update: {
          created_at?: null | string;
          id?: never;
          name?: string;
          payment_interval?: string;
          user_id?: string;
          amount?: number;
        };
      };
      user_books: {
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
          is_admin: boolean;
          user_id: string;
          book_id: number;
        };
        Insert: {
          user_id: string;
          book_id: number;
          is_admin?: boolean;
        };
        Update: {
          is_admin?: boolean;
          user_id?: string;
          book_id?: number;
        };
      };
      budget_plan: {
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'budget_plan_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          active: boolean;
          created_at: null | string;
          id: number;
          name: string;
          updated_at: null | string;
          user_id: string;
          total_income: number;
        };
        Insert: {
          name: string;
          total_income: number;
          active?: boolean;
          created_at?: null | string;
          id?: number;
          updated_at?: null | string;
          user_id?: string;
        };
        Update: {
          active?: boolean;
          created_at?: null | string;
          id?: number;
          name?: string;
          updated_at?: null | string;
          user_id?: string;
          total_income?: number;
        };
      };
      expense: {
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
          created_at: string;
          created_by: string;
          date: string;
          id: number;
          page_id: number;
          amount: number;
          comment: null | string;
          position: number;
        };
        Insert: {
          date: string;
          page_id: number;
          amount: number;
          created_at?: string;
          created_by?: string;
          id?: number;
          comment?: null | string;
          position?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          date?: string;
          id?: number;
          page_id?: number;
          amount?: number;
          comment?: null | string;
          position?: number;
        };
      };
      expenses_tags: {
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
            columns: ['expense_id'];
            foreignKeyName: 'expenses_tags_expense_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'position_sorted_expenses';
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
        Insert: {
          expense_id: number;
          tag_id: number;
        };
        Update: {
          expense_id?: number;
          tag_id?: number;
        };
      };
      last_accessed_pages: {
        Relationships: [
          {
            columns: ['page_id'];
            foreignKeyName: 'last_accessed_pages_page_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'page';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'last_accessed_pages_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          last_accessed: null | string;
          page_id: number;
          user_id: string;
        };
        Insert: {
          page_id: number;
          last_accessed?: null | string;
          user_id?: string;
        };
        Update: {
          last_accessed?: null | string;
          page_id?: number;
          user_id?: string;
        };
      };
      page: {
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
          created_at: string;
          created_by: string;
          id: number;
          name: string;
          book_id: number;
        };
        Insert: {
          name: string;
          book_id: number;
          created_at?: string;
          created_by?: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: number;
          name?: string;
          book_id?: number;
        };
      };
      pinned_pages: {
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
        Insert: {
          page_id: number;
          last_clicked?: null | string;
          user_id?: string;
        };
        Update: {
          last_clicked?: null | string;
          page_id?: number;
          user_id?: string;
        };
      };
      preset_budget_plan: {
        Relationships: [];
        Row: {
          created_at: null | string;
          id: number;
          name: string;
          description: null | string;
        };
        Insert: {
          name: string;
          created_at?: null | string;
          id?: number;
          description?: null | string;
        };
        Update: {
          created_at?: null | string;
          id?: number;
          name?: string;
          description?: null | string;
        };
      };
      tag: {
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
          created_at: string;
          id: number;
          name: string;
          book_id: number;
          color: string;
        };
        Insert: {
          name: string;
          book_id: number;
          color: string;
          created_at?: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          book_id?: number;
          color?: string;
        };
      };
    };
    Views: {
      date_sorted_expenses: {
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
          created_at: null | string;
          created_by: null | string;
          date: null | string;
          id: null | number;
          page_id: null | number;
          amount: null | number;
          comment: null | string;
          position: null | number;
        };
        Insert: {
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
          amount?: null | number;
          comment?: null | string;
          position?: null | number;
        };
        Update: {
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
          amount?: null | number;
          comment?: null | string;
          position?: null | number;
        };
      };
      position_sorted_expenses: {
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
          created_at: null | string;
          created_by: null | string;
          date: null | string;
          id: null | number;
          page_id: null | number;
          amount: null | number;
          comment: null | string;
          position: null | number;
        };
        Insert: {
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
          amount?: null | number;
          comment?: null | string;
          position?: null | number;
        };
        Update: {
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
          amount?: null | number;
          comment?: null | string;
          position?: null | number;
        };
      };
    };
  };
  i18n: {
    CompositeTypes: {
      [_ in never]: never
    };
    Functions: {
      create_project: {
        Returns: number;
        Args: {
          p_default_language_id: number;
          p_language_ids: number[];
          p_name: string;
          p_description: string;
          p_website_url?: string;
        };
      };
    };
    Enums: {
      [_ in never]: never
    };
    Tables: {
      project_languages: {
        Relationships: [
          {
            columns: ['language_id'];
            foreignKeyName: 'project_languages_language_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'languages';
          },
          {
            columns: ['project_id'];
            foreignKeyName: 'project_languages_project_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'projects';
          }
        ];
        Row: {
          id: number;
          is_default: boolean;
          language_id: number;
          project_id: number;
        };
        Insert: {
          language_id: number;
          project_id: number;
          id?: never;
          is_default?: boolean;
        };
        Update: {
          id?: never;
          is_default?: boolean;
          language_id?: number;
          project_id?: number;
        };
      };
      projects: {
        Relationships: [
          {
            columns: ['owner_id'];
            foreignKeyName: 'projects_owner_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          }
        ];
        Row: {
          id: number;
          last_updated: null | string;
          name: string;
          website_url: null | string;
          description: null | string;
          owner_id: string;
        };
        Insert: {
          name: string;
          id?: never;
          last_updated?: null | string;
          website_url?: null | string;
          description?: null | string;
          owner_id?: string;
        };
        Update: {
          id?: never;
          last_updated?: null | string;
          name?: string;
          website_url?: null | string;
          description?: null | string;
          owner_id?: string;
        };
      };
      translations: {
        Relationships: [
          {
            columns: ['key_id'];
            foreignKeyName: 'translations_key_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'keys';
          },
          {
            columns: ['language_id'];
            foreignKeyName: 'translations_language_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'languages';
          }
        ];
        Row: {
          id: number;
          key_id: number;
          language_id: number;
          value: null | string;
        };
        Insert: {
          key_id: number;
          language_id: number;
          id?: never;
          value?: null | string;
        };
        Update: {
          id?: never;
          key_id?: number;
          language_id?: number;
          value?: null | string;
        };
      };
      keys: {
        Relationships: [
          {
            columns: ['project_id'];
            foreignKeyName: 'keys_project_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'projects';
          }
        ];
        Row: {
          id: number;
          key_name: string;
          description: null | string;
          project_id: number;
        };
        Insert: {
          key_name: string;
          project_id: number;
          id?: never;
          description?: null | string;
        };
        Update: {
          id?: never;
          key_name?: string;
          description?: null | string;
          project_id?: number;
        };
      };
      languages: {
        Relationships: [];
        Row: {
          id: number;
          name: string;
          code: string;
        };
        Insert: {
          name: string;
          code: string;
          id?: never;
        };
        Update: {
          id?: never;
          name?: string;
          code?: string;
        };
      };
    };
    Views: {
      [_ in never]: never
    };
  };
  public: {
    CompositeTypes: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    Tables: {
      user_data: {
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
        Insert: {
          first_name: string;
          id: string;
          last_name?: null | string;
        };
        Update: {
          first_name?: string;
          id?: string;
          last_name?: null | string;
        };
      };
    };
    Views: {
      [_ in never]: never
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

