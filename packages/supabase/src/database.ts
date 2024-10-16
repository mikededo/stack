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
      one_time_tokens: {
        Insert: {
          id: string;
          relates_to: string;
          token_hash: string;
          token_type: Database['auth']['Enums']['one_time_token_type'];
          user_id: string;
          created_at?: string;
          updated_at?: string;
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
      audit_log_entries: {
        Relationships: [];
        Insert: {
          id: string;
          created_at?: null | string;
          instance_id?: null | string;
          ip_address?: string;
          payload?: Json | null;
        };
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
        Relationships: [];
        Insert: {
          auth_code: string;
          authentication_method: string;
          code_challenge: string;
          code_challenge_method: Database['auth']['Enums']['code_challenge_method'];
          id: string;
          provider_type: string;
          auth_code_issued_at?: null | string;
          created_at?: null | string;
          provider_access_token?: null | string;
          provider_refresh_token?: null | string;
          updated_at?: null | string;
          user_id?: null | string;
        };
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
          identity_data: Json;
          provider: string;
          provider_id: string;
          user_id: string;
          created_at?: null | string;
          email?: null | string;
          id?: string;
          last_sign_in_at?: null | string;
          updated_at?: null | string;
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
        Relationships: [];
        Insert: {
          id: string;
          created_at?: null | string;
          raw_base_config?: null | string;
          updated_at?: null | string;
          uuid?: null | string;
        };
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
          otp_code?: null | string;
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
          otp_code: null | string;
          verified_at: null | string;
        };
        Update: {
          created_at?: string;
          factor_id?: string;
          id?: string;
          ip_address?: unknown;
          otp_code?: null | string;
          verified_at?: null | string;
        };
      };
      mfa_factors: {
        Insert: {
          created_at: string;
          factor_type: Database['auth']['Enums']['factor_type'];
          id: string;
          status: Database['auth']['Enums']['factor_status'];
          updated_at: string;
          user_id: string;
          friendly_name?: null | string;
          last_challenged_at?: null | string;
          phone?: null | string;
          secret?: null | string;
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
          last_challenged_at: null | string;
          phone: null | string;
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
          last_challenged_at?: null | string;
          phone?: null | string;
          secret?: null | string;
          status?: Database['auth']['Enums']['factor_status'];
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
          entity_id: string;
          id: string;
          metadata_xml: string;
          sso_provider_id: string;
          attribute_mapping?: Json | null;
          created_at?: null | string;
          metadata_url?: null | string;
          name_id_format?: null | string;
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
          id: string;
          request_id: string;
          sso_provider_id: string;
          created_at?: null | string;
          flow_state_id?: null | string;
          for_email?: null | string;
          redirect_to?: null | string;
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
        Relationships: [];
        Insert: {
          version: string;
        };
        Row: {
          version: string;
        };
        Update: {
          version?: string;
        };
      };
      sessions: {
        Insert: {
          id: string;
          user_id: string;
          aal?: Database['auth']['Enums']['aal_level'] | null;
          created_at?: null | string;
          factor_id?: null | string;
          ip?: null | unknown;
          not_after?: null | string;
          refreshed_at?: null | string;
          tag?: null | string;
          updated_at?: null | string;
          user_agent?: null | string;
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
          domain: string;
          id: string;
          sso_provider_id: string;
          created_at?: null | string;
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
        Relationships: [];
        Insert: {
          id: string;
          created_at?: null | string;
          resource_id?: null | string;
          updated_at?: null | string;
        };
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
        Relationships: [];
        Insert: {
          id: string;
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
      [_ in never]: never
    };
  };
  finances: {
    CompositeTypes: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    Functions: {
      create_budget_plan: {
        Returns: Json;
        Args: {
          allocations: Json;
          name: string;
          total_income: number;
        };
      };
      log_last_accessed_page: {
        Returns: undefined;
        Args: {
          page: number;
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
          allocations: Json;
          plan_id: number;
          plan_name: string;
          plan_total_income: number;
        };
      };
    };
    Tables: {
      book: {
        Insert: {
          name: string;
          archived?: boolean | null;
          created_at?: string;
          created_by?: string;
          id?: number;
          last_viewed?: string;
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
      budget_allocation: {
        Insert: {
          budget_plan_id: number;
          name: string;
          amount?: null | number;
          id?: number;
          percentage?: null | number;
        };
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
          amount: null | number;
          budget_plan_id: number;
          id: number;
          name: string;
          percentage: null | number;
        };
        Update: {
          amount?: null | number;
          budget_plan_id?: number;
          id?: number;
          name?: string;
          percentage?: null | number;
        };
      };
      budget_plan: {
        Insert: {
          name: string;
          total_income: number;
          active?: boolean;
          created_at?: null | string;
          id?: number;
          updated_at?: null | string;
          user_id?: string;
        };
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
          total_income: number;
          updated_at: null | string;
          user_id: string;
        };
        Update: {
          active?: boolean;
          created_at?: null | string;
          id?: number;
          name?: string;
          total_income?: number;
          updated_at?: null | string;
          user_id?: string;
        };
      };
      expense: {
        Insert: {
          amount: number;
          date: string;
          page_id: number;
          comment?: null | string;
          created_at?: string;
          created_by?: string;
          id?: number;
          position?: number;
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
          position: number;
        };
        Update: {
          amount?: number;
          comment?: null | string;
          created_at?: string;
          created_by?: string;
          date?: string;
          id?: number;
          page_id?: number;
          position?: number;
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
        Update: {
          expense_id?: number;
          tag_id?: number;
        };
      };
      last_accessed_pages: {
        Insert: {
          page_id: number;
          last_accessed?: null | string;
          user_id?: string;
        };
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
        Update: {
          last_accessed?: null | string;
          page_id?: number;
          user_id?: string;
        };
      };
      page: {
        Insert: {
          book_id: number;
          name: string;
          created_at?: string;
          created_by?: string;
          id?: number;
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
          page_id: number;
          last_clicked?: null | string;
          user_id?: string;
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
      preset_budget_allocation: {
        Insert: {
          name: string;
          preset_plan_id: number;
          amount?: null | number;
          id?: number;
          percentage?: null | number;
        };
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
          amount: null | number;
          id: number;
          name: string;
          percentage: null | number;
          preset_plan_id: number;
        };
        Update: {
          amount?: null | number;
          id?: number;
          name?: string;
          percentage?: null | number;
          preset_plan_id?: number;
        };
      };
      preset_budget_plan: {
        Relationships: [];
        Insert: {
          name: string;
          created_at?: null | string;
          description?: null | string;
          id?: number;
        };
        Row: {
          created_at: null | string;
          description: null | string;
          id: number;
          name: string;
        };
        Update: {
          created_at?: null | string;
          description?: null | string;
          id?: number;
          name?: string;
        };
      };
      subscriptions: {
        Insert: {
          amount: number;
          name: string;
          payment_interval: string;
          created_at?: null | string;
          id?: never;
          user_id?: string;
        };
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
          amount: number;
          created_at: null | string;
          id: number;
          name: string;
          payment_interval: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: null | string;
          id?: never;
          name?: string;
          payment_interval?: string;
          user_id?: string;
        };
      };
      tag: {
        Insert: {
          book_id: number;
          color: string;
          name: string;
          created_at?: string;
          id?: number;
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
          user_id: string;
          is_admin?: boolean;
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
          position?: null | number;
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
          position: null | number;
        };
        Update: {
          amount?: null | number;
          comment?: null | string;
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
          position?: null | number;
        };
      };
      position_sorted_expenses: {
        Insert: {
          amount?: null | number;
          comment?: null | string;
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
          position?: null | number;
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
          position: null | number;
        };
        Update: {
          amount?: null | number;
          comment?: null | string;
          created_at?: null | string;
          created_by?: null | string;
          date?: null | string;
          id?: null | number;
          page_id?: null | number;
          position?: null | number;
        };
      };
    };
  };
  i18n: {
    CompositeTypes: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    Functions: {
      create_project: {
        Returns: number;
        Args: {
          p_default_language_id: number;
          p_description: string;
          p_language_ids: number[];
          p_name: string;
          p_website_url?: string;
        };
      };
    };
    Tables: {
      keys: {
        Insert: {
          key_name: string;
          description?: null | string;
          id?: never;
          project_id?: null | number;
        };
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
          description: null | string;
          id: number;
          key_name: string;
          project_id: null | number;
        };
        Update: {
          description?: null | string;
          id?: never;
          key_name?: string;
          project_id?: null | number;
        };
      };
      languages: {
        Relationships: [];
        Insert: {
          code: string;
          name: string;
          id?: never;
        };
        Row: {
          code: string;
          id: number;
          name: string;
        };
        Update: {
          code?: string;
          id?: never;
          name?: string;
        };
      };
      project_languages: {
        Insert: {
          language_id: number;
          project_id: number;
          id?: never;
          is_default?: boolean;
        };
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
        Update: {
          id?: never;
          is_default?: boolean;
          language_id?: number;
          project_id?: number;
        };
      };
      projects: {
        Insert: {
          name: string;
          owner_id: string;
          description?: null | string;
          id?: never;
          last_updated?: null | string;
          website_url?: null | string;
        };
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
          description: null | string;
          id: number;
          last_updated: null | string;
          name: string;
          owner_id: string;
          website_url: null | string;
        };
        Update: {
          description?: null | string;
          id?: never;
          last_updated?: null | string;
          name?: string;
          owner_id?: string;
          website_url?: null | string;
        };
      };
      translations: {
        Insert: {
          id?: never;
          key_id?: null | number;
          language_id?: null | number;
          value?: null | string;
        };
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
          key_id: null | number;
          language_id: null | number;
          value: null | string;
        };
        Update: {
          id?: never;
          key_id?: null | number;
          language_id?: null | number;
          value?: null | string;
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
    Enums: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
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

