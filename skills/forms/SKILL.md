---
name: forms
description: "Guides building forms with React Hook Form, Zod and MUI fields: one schema shared with the server, labels, linked help and errors, validation timing, focus on the first error, submit state and keeping input on failure. Use for any form or input-heavy screen."
user-invocable: false
---

# Forms

```tsx
const schema = z.object({
  email: z.string().email('Enter an email like name@example.com'),
  username: z.string().min(3, 'Use at least 3 characters'),
});
type Values = z.infer<typeof schema>;

const { control, handleSubmit, formState: { errors, isSubmitting } } =
  useForm<Values>({ resolver: zodResolver(schema), mode: 'onBlur', shouldFocusError: true });

<Controller name="email" control={control} render={({ field }) => (
  <TextField {...field} label="Email" type="email" autoComplete="email"
    error={!!errors.email} helperText={errors.email?.message} />
)} />
<Button type="submit" loading={isSubmitting}>Create account</Button>
```

## Rules
- Share the Zod schema with the server endpoint where possible.
- Every field has a visible label. MUI links `helperText` with `aria-describedby`; keep it that way.
- Validate on blur and on submit, not on every keystroke. On submit, focus moves to the first
  error; long forms also show an error summary at the top.
- Error messages say what's wrong and how to fix it.
- The submit button shows progress and blocks double submits; the server still guards against
  duplicates.
- Keep what the person typed when submitting fails.
