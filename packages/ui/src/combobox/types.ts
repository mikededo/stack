import type { ActionArray } from '@stack/actions';

import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

/**
 * Properties forwarded to the custom input snippet.
 */
type InputSnippetProps = {
  /**
   * Forwarded ref from {@link Props.inputRef}. If no `inputRef` is passed to
   * the combobox, it will forward the internal reference.
   * Note that binded elements cannot be used as destructured props in the
   * snippet. See this {@link https://github.com/sveltejs/svelte/discussions/12688#discussioncomment-10215226|comment}.
   */
  ref: HTMLInputElement | undefined;
  /**
   * List of actions that are forwarded to the custom input element which
   * provide most of the controls to work with the combobox.
   *
   * Should be used as:
   * ```svelte
   * <script>
   *     import { useActions } from '@stack/actions';
   * </script>
   *
   * <Combobox>
   *    {#snippet input({ use })}
   *        <input use:useActions={[...use]} />
   *    {/snippet}
   * </Combobox>
   * ```
   */
  use: ActionArray;
};

export type Props = (
  {
    /**
     * Optional input to be rendered instead of the default one.
     */
    input: Snippet<[InputSnippetProps]>;
    /**
     * The value of the input element. When using a custom input, the value
     * must* be binded to the component, otherwise some of the features of the
     * combobox (such as removing an input on backspace) won't work as
     * expected. This is because the combobox will not be able to access the
     * value.
     */
    value: string;
    inputProps?: never;
  } | {
    inputProps: { class?: string; invalid?: boolean; label?: string } & HTMLInputAttributes;
    input?: never;
    /**
     * The value of the input element. Can be controlled, to, for example,
     * filter the options by the current user value.
     * Contrary to the custom input, the value does not have to be binded to the component.
     */
    value?: string;
  }
) &
{
  /**
   * The list of options that will be displayed in the dropdown.
   * This is a function or component that renders the options.
   */
  options: Snippet;
  /**
   * A reference to the input element. This is exposed so that the parent
   * component can directly manipulate or access the input field, if
   * needed (e.g., forcing focus on external actions or events).
   */
  inputRef?: HTMLInputElement;
  /**
   * Controls if the input should be focused on load. Defaults to `false`.
   */
  autofocus?: boolean;
  /**
   * The currently selected options. Similar to `options`, it is expected
   * to be a function or component that renders the selected items.
   * Will be ignored if not provided.
   */
  selectedOptions?: Snippet;
  /**
   * Controls the visibility of the dropdown containing the options. If
   * `true`, the dropdown is shown; otherwise, it is hidden. The
   * component already has an internal show state, yet it allows the
   * parent component to also control the visibility. However, the check
   * is done using an AND, meaning that if the internal show state is
   * `false`, no matter the forwarded prop, it won't be shown. Same the
   * other way around.
   * Defaults to `false`.
   */
  show?: boolean;

  /**
   * Callback triggered when the "ArrowDown" key is pressed while the
   * input is focused. Typically used to move focus to the first element
   * in the options dropdown. Internally, it will search for the first
   * focusable element available, which should always be the first
   * option.
   * See {@linkcode focusableElements} for more details on how the next
   * element is determined.
   */
  onArrowDownPress?: () => void;

  /**
   * Callback triggered when the "ArrowUp" key is pressed while the
   * input is focused. Typically used to move focus to the last element
   * in the options dropdown. Internally, it will search for the last
   * focusable element available, which should always be the last
   * option.
   * See {@linkcode focusableElements} for more details on how the
   * previous element is determined.
   */
  onArrowUpPress?: () => void;

  /**
   * Callback triggered when the "Backspace" key is pressed while the
   * input is focused. Typically used to handle deletion behavior (e.g.,
   * removing selected tags).
   */
  onBackspacePress?: () => void;
};
