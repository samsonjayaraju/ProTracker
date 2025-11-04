"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

// Assuming 'cn' is imported from an existing utility file
import { cn } from "./utils";

// --- Root and Primitive Wrappers ---

/**
 * ## 🖼️ Dialog (Root)
 * The main component that manages the open/closed state of the modal.
 */
// Original: function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>)
function Dialog(props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * ## 🔘 DialogTrigger
 * The button or element that opens the dialog when clicked.
 */
// Original: function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>)
function DialogTrigger(props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * ## 🚪 DialogPortal
 * Renders the dialog's content outside of the main DOM tree (usually under the body tag).
 */
// Original: function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>)
function DialogPortal(props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * ## ✖️ DialogClose
 * The element (often a button) that closes the dialog.
 */
// Original: function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>)
function DialogClose(props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

// --- Content Components ---

/**
 * ## 🌫️ DialogOverlay
 * The background layer that covers the main content when the dialog is open.
 */
// Original: function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>)
function DialogOverlay({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ## 📝 DialogContent
 * The actual visible container for the modal content. Automatically includes the `Overlay` and a close button.
 */
// Original: function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>)
function DialogContent({
  className,
  children,
  ...props
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * ## ⬆️ DialogHeader
 * Container for the title and description, typically aligned at the top.
 */
// Original: function DialogHeader({ className, ...props }: React.ComponentProps<"div">)
function DialogHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

/**
 * ## ⬇️ DialogFooter
 * Container for action buttons, typically aligned at the bottom.
 */
// Original: function DialogFooter({ className, ...props }: React.ComponentProps<"div">)
function DialogFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ## 🏷️ DialogTitle
 * The title of the dialog.
 */
// Original: function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>)
function DialogTitle({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * ## 💬 DialogDescription
 * Supplementary text explaining the dialog's purpose.
 */
// Original: function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>)
function DialogDescription({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};