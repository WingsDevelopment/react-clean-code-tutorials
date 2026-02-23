import { Tooltip as BUTooltip } from "@base-ui-components/react/tooltip"
import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"
import { cn } from "../../utils"

/**
 * Base UI Tooltip shim with a Radix-like API.
 * - Keep <Tooltip><TooltipTrigger>…</TooltipTrigger><TooltipContent/></Tooltip>
 * - No `asChild` needed; we use Base UI's `render` prop.
 * - Type-safe props; resolves union/overlap between Positioner & Popup.
 */

// ----------------------
// Styling Variants
// ----------------------
const tooltipContentVariants = cva(
  [
    // layout & sizing
    "text-slate-100",
    "z-[2147483647]",
    "w-fit",
    "max-w-[640px]",
    // Base UI uses --transform-origin
    "origin-[var(--transform-origin)]",

    // appearance
    "rounded-md",
    "border border-slate-700",
    "bg-slate-900",
    "shadow-xl shadow-black/40",
    "overflow-visible",

    // entry/exit animations (Base UI data attrs)
    "transition-[transform,scale,opacity]",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",

    // optional subtle slide by side
    "data-[side=bottom]:translate-y-[-2px]",
    "data-[side=top]:translate-y-[2px]",
    "data-[side=left]:translate-x-[2px]",
    "data-[side=right]:translate-x-[-2px]",
  ],
  {
    variants: {
      size: {
        small: "px-3 py-2",
        medium: "px-4 py-3",
        big: "px-5 py-4",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
)

export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>

// ----------------------
// Provider
// ----------------------

/**
 * Wraps Base UI <Tooltip.Provider>.
 * Radix had `delayDuration`; Base UI uses `delay` (open) + `closeDelay`.
 */
export function TooltipProvider({
  delayDuration = 0,
  closeDelay = 0,
  timeout = 400,
  ...props
}: {
  /** ms before first tooltip opens */
  delayDuration?: number
  /** ms before tooltip closes */
  closeDelay?: number
  /** internal timing budget (Base UI) */
  timeout?: number
} & React.ComponentProps<typeof BUTooltip.Provider>) {
  return (
    <BUTooltip.Provider
      data-slot="tooltip-provider"
      delay={delayDuration}
      closeDelay={closeDelay}
      timeout={timeout}
      {...props}
    />
  )
}

// ----------------------
// Root
// ----------------------

/**
 * Root wrapper. We auto-wrap with a Provider (0ms delay) to match previous ergonomics.
 */
export function Tooltip(
  props: React.ComponentProps<typeof BUTooltip.Root> & {
    /** Optional per-tooltip delay override (ms). */
    delayDuration?: number
    /** Optional per-tooltip close delay (ms). */
    closeDelay?: number
  },
) {
  const { delayDuration = 0, closeDelay = 0, ...rootProps } = props
  return (
    <TooltipProvider delayDuration={delayDuration} closeDelay={closeDelay}>
      <BUTooltip.Root data-slot="tooltip" {...rootProps} />
    </TooltipProvider>
  )
}

// ----------------------
// Trigger
// ----------------------

type TriggerProps = React.ComponentProps<typeof BUTooltip.Trigger>

type TriggerRenderElement = React.ReactElement<Record<string, unknown>>

/**
 * Base UI Trigger supports a `render` prop so your child becomes the trigger element.
 * This removes the need for `asChild` and prevents nested buttons.
 */
export function TooltipTrigger({
  children,
  ...props
}: Omit<TriggerProps, "render" | "children"> & {
  children: TriggerRenderElement
}) {
  return (
    <BUTooltip.Trigger
      data-slot="tooltip-trigger"
      {...props}
      render={children as TriggerRenderElement}
    />
  )
}

// ----------------------
// Heading + Footer (optional slots)
// ----------------------
export function TooltipHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("typography-mono1 font-bold", className)}>{children}</div>
}

export function TooltipFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("mt-2", className)}>{children}</div>
}

// ----------------------
// Content (Positioner + Popup + Arrow)
// ----------------------

// Narrow, explicit subsets to avoid conflicting `render`/`children` definitions
// between Positioner and Popup types.

type PositionerProps = React.ComponentProps<typeof BUTooltip.Positioner>

type PositionerSubset = Pick<
  PositionerProps,
  | "side"
  | "sideOffset"
  | "align"
  | "alignOffset"
  | "collisionPadding"
  | "sticky"
  | "positionMethod"
  | "collisionBoundary"
  | "collisionAvoidance"
  | "arrowPadding"
> & { className?: string }

// Popup allows many DOM props; we exclude className since we handle it
// and exclude `children` because we define it ourselves.

type PopupProps = React.ComponentProps<typeof BUTooltip.Popup>

type PopupSubset = Omit<PopupProps, "className" | "children" | "render">

export interface TooltipContentProps extends TooltipContentVariants, PositionerSubset, PopupSubset {
  interactive?: boolean
  highlightIcon?: React.ReactNode
  heading?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  hideArrow?: boolean
}

export function TooltipContent({
  size,
  highlightIcon,
  heading,
  footer,
  className,
  children,
  interactive = true,
  // Positioner props
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  collisionPadding = 5,
  sticky = false,
  positionMethod = "fixed",
  hideArrow = false,
  ...popupProps
}: TooltipContentProps) {
  return (
    <BUTooltip.Portal>
      <BUTooltip.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        sticky={sticky}
        positionMethod={positionMethod}
        data-slot="tooltip-positioner"
        className="z-[2147483647]"
        onPointerDownCapture={interactive ? (e) => e.stopPropagation() : undefined}
      >
        <BUTooltip.Popup
          data-slot="tooltip-content"
          {...popupProps}
          className={cn(tooltipContentVariants({ size }), className)}
          onClickCapture={interactive ? (e) => e.stopPropagation() : undefined}
          onPointerDownCapture={interactive ? (e) => e.stopPropagation() : undefined}
          onMouseDownCapture={interactive ? (e) => e.stopPropagation() : undefined}
        >
          {highlightIcon ? (
            <div className="flex gap-4">
              <div>{highlightIcon}</div>
              <div className="flex flex-col gap-2">
                {heading && <TooltipHeading>{heading}</TooltipHeading>}
                <div>{children}</div>
                {footer && <TooltipFooter>{footer}</TooltipFooter>}
              </div>
            </div>
          ) : (
            <>
              {heading && <TooltipHeading className="mb-1">{heading}</TooltipHeading>}
              <div>{children}</div>
              {footer && <TooltipFooter>{footer}</TooltipFooter>}
            </>
          )}
          {!hideArrow && (
            <BUTooltip.Arrow className="data-[side=bottom]:top-[-6px] data-[side=left]:right-[-10px] data-[side=left]:rotate-90 data-[side=right]:left-[-10px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180">
              <span
                aria-hidden
                className="block h-3 w-3 rotate-45 border border-slate-700 bg-slate-900"
              />
            </BUTooltip.Arrow>
          )}
        </BUTooltip.Popup>
      </BUTooltip.Positioner>
    </BUTooltip.Portal>
  )
}
