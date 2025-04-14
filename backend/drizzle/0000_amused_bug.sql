CREATE TYPE "public"."application_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."ecosystem" AS ENUM('web', 'mobile', 'cloud', 'data', 'devops', 'ai_ml', 'blockchain', 'iot', 'gaming', 'other');--> statement-breakpoint
CREATE TYPE "public"."experienceLevel" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TYPE "public"."project_category" AS ENUM('web_app', 'mobile_app', 'desktop_app', 'api', 'data_engineering', 'machine_learning', 'devops', 'blockchain', 'game_development', 'other');--> statement-breakpoint
CREATE TYPE "public"."project_stage" AS ENUM('Idea', 'Planning', 'Development', 'Testing', 'Deployment', 'Maintenance');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('draft', 'published', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('frontend_developer', 'backend_developer', 'fullstack_developer', 'mobile_developer', 'ui_ux_designer', 'devops_engineer', 'cloud_engineer', 'data_engineer', 'data_scientist', 'ml_engineer', 'qa_engineer', 'security_engineer', 'blockchain_developer', 'game_developer', 'technical_product_manager', 'technical_writer', 'other');--> statement-breakpoint
CREATE TYPE "public"."tech_stack" AS ENUM('react', 'vue', 'angular', 'svelte', 'next_js', 'tailwind', 'typescript', 'node_js', 'express', 'django', 'flask', 'spring', 'laravel', 'ruby_rails', 'react_native', 'flutter', 'swift', 'kotlin', 'postgresql', 'mongodb', 'mysql', 'redis', 'dynamodb', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci_cd', 'graphql', 'rest', 'websockets', 'blockchain', 'ai_ml', 'other');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"userAgent" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"expiresAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"banner" text,
	"avatar" text,
	"category" "project_category",
	"status" "project_status" DEFAULT 'draft' NOT NULL,
	"ecosystem" "ecosystem",
	"stage" "project_stage",
	"repo_url" text,
	"live_url" text,
	"inviteCode" text,
	"join_link" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_id_unique" UNIQUE("id"),
	CONSTRAINT "projects_inviteCode_unique" UNIQUE("inviteCode"),
	CONSTRAINT "projects_join_link_unique" UNIQUE("join_link")
);
--> statement-breakpoint
CREATE TABLE "projectTechStack" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"tech_stack" "tech_stack" NOT NULL,
	CONSTRAINT "projectTechStack_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "project_role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"role" "role" NOT NULL,
	"description" text NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"isRemote" boolean DEFAULT false NOT NULL,
	"experience_level" varchar(50),
	CONSTRAINT "project_role_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "project_member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role_id" uuid,
	"is_owner" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_member_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projectTechStack" ADD CONSTRAINT "projectTechStack_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_role" ADD CONSTRAINT "project_role_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_role_id_project_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."project_role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "project_tech_idx" ON "projectTechStack" USING btree ("project_id","tech_stack");--> statement-breakpoint
CREATE UNIQUE INDEX "project_role_idx" ON "project_role" USING btree ("project_id","role");--> statement-breakpoint
CREATE UNIQUE INDEX "project_user_idx" ON "project_member" USING btree ("project_id","user_id");