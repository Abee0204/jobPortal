import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileFormData,
} from "../schemas/profile.schema";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import type { UserProfile } from "@/types/profile.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User, Mail, Phone, Loader2, X, Check } from "lucide-react";
import axios from "axios";

interface EditProfileFormProps {
  user: UserProfile;
  onCancel: () => void;
}

export const EditProfileForm = ({ user, onCancel }: EditProfileFormProps) => {
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      contact: user.contact || "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data, {
      onSuccess: (response: any) => {
        const successMessage =
          response?.message || "Profile updated successfully";
        toast.success(successMessage, { position: "top-center" });
        onCancel();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Failed to update profile";
          toast.error(message, { position: "top-center" });
        } else {
          toast.error("Failed to update profile", { position: "top-center" });
        }
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Edit Profile Information
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-slate-400" />
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
            {...form.register("name")}
          />
          {form.formState.errors.name?.message && (
            <p className="text-xs font-semibold text-destructive mt-1">
              {form.formState.errors.name?.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
            {...form.register("email")}
          />
          {form.formState.errors.email?.message && (
            <p className="text-xs font-semibold text-destructive mt-1">
              {form.formState.errors.email?.message}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-1.5">
          <label htmlFor="contact" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            Contact Number
          </label>
          <Input
            id="contact"
            type="text"
            placeholder="+1 (555) 000-0000"
            className="h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
            {...form.register("contact")}
          />
          {form.formState.errors.contact?.message && (
            <p className="text-xs font-semibold text-destructive mt-1">
              {form.formState.errors.contact?.message}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={updateProfileMutation.isPending}
          className="rounded-xl font-bold px-5 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={updateProfileMutation.isPending}
          className="rounded-xl font-bold px-6 flex items-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
        >
          {updateProfileMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
