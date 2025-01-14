// This module is responsible for augmenting the upstream definitions of entities that interact
// with templates to include the information necessary for Glint to typecheck them.
import { ComponentLike, HelperLike, ModifierLike } from '@glint/template';
import {
  Context,
  DirectInvokable,
  FlattenBlockParams,
  TemplateContext,
} from '@glint/template/-private/integration';

//////////////////////////////////////////////////////////////////////
// Components

import '@glimmerx/component';

// Declaring that `hbs` returns a `TemplateComponent` prevents vanilla `tsc` from freaking out when
// it sees code like `const MyThing: TC<Sig> = hbs...`. Glint itself will never see `hbs` get used, as
// it's transformed to the template DSL before typechecking.
type ComponentContext<This, S> = TemplateContext<
  This,
  ComponentSignatureArgs<S>['Named'],
  FlattenBlockParams<ComponentSignatureBlocks<S>>,
  ComponentSignatureElement<S>
>;

declare module '@glimmerx/component' {
  export default interface Component<S> extends InstanceType<ComponentLike<S>> {
    [Context]: ComponentContext<this, S>;
  }

  export interface TemplateComponentInstance<S> extends InstanceType<ComponentLike<S>> {
    [Context]: ComponentContext<null, S>;
  }
}

//////////////////////////////////////////////////////////////////////
// Helpers

import '@glimmerx/helper';

type _FnHelper = DirectInvokable<{
  <Ret, Args extends unknown[]>(f: (...rest: Args) => Ret): (...rest: Args) => Ret;
  <A, Ret, Args extends unknown[]>(f: (a: A, ...rest: Args) => Ret, a: A): (...rest: Args) => Ret;
  <A, B, Ret, Args extends unknown[]>(f: (a: A, b: B, ...rest: Args) => Ret, a: A, b: B): (
    ...rest: Args
  ) => Ret;
  <A, B, C, Ret, Args extends unknown[]>(
    f: (a: A, b: B, c: C, ...rest: Args) => Ret,
    a: A,
    b: B,
    c: C
  ): (...rest: Args) => Ret;
  <A, B, C, D, Ret, Args extends unknown[]>(
    f: (a: A, b: B, c: C, d: D, ...rest: Args) => Ret,
    a: A,
    b: B,
    c: C,
    d: D
  ): (...rest: Args) => Ret;
  <A, B, C, D, E, Ret, Args extends unknown[]>(
    f: (a: A, b: B, c: C, d: D, e: E, ...rest: Args) => Ret,
    a: A,
    b: B,
    c: C,
    d: D,
    e: E
  ): (...rest: Args) => Ret;
  <A, B, C, D, E, G, Ret, Args extends unknown[]>(
    f: (a: A, b: B, c: C, d: D, e: E, g: G, ...rest: Args) => Ret,
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    g: G
  ): (...rest: Args) => Ret;
}>;

declare module '@glimmerx/helper/dist/commonjs/src/helper' {
  export interface HelperInstance<S> extends InstanceType<HelperLike<S>> {}
}

declare module '@glimmerx/helper' {
  export interface FnHelper extends _FnHelper {}
}

//////////////////////////////////////////////////////////////////////
// Modifiers

import '@glimmerx/modifier';
import {
  ComponentSignatureArgs,
  ComponentSignatureBlocks,
  ComponentSignatureElement,
} from '@glint/template/-private/signature';

export interface OnModifierArgs {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}

type EventForName<Name extends string> = Name extends keyof HTMLElementEventMap
  ? HTMLElementEventMap[Name]
  : Event;

type _OnModifier = abstract new <Name extends string>() => InstanceType<
  ModifierLike<{
    Element: Element;
    Args: {
      Named: OnModifierArgs;
      Positional: [name: Name, callback: (event: EventForName<Name>) => void];
    };
  }>
>;

declare module '@glimmerx/modifier' {
  export interface OnModifier extends _OnModifier {}
}
