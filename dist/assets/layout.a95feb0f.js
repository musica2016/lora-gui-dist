import {
    n as nextTick,
    E as EVENT_CODE,
    f as defineComponent,
    i as ElButton,
    j as ElFocusTrap,
    k as ElInput,
    l as ElOverlay,
    m as ElIcon,
    T as TypeComponents,
    p as isValidComponentSize,
    q as useGlobalComponentSettings,
    s as computed,
    v as ref,
    x as reactive,
    y as TypeComponentsMap,
    z as useId,
    A as watch,
    B as useDraggable,
    C as onMounted,
    D as onBeforeUnmount,
    F as useLockscreen,
    G as toRefs,
    H as _export_sfc,
    I as useSameTarget,
    r as resolveComponent,
    o as openBlock,
    J as createBlock,
    w as withCtx,
    K as withDirectives,
    d as createVNode,
    a as createBaseVNode,
    L as normalizeClass,
    M as normalizeStyle,
    N as withModifiers,
    c as createElementBlock,
    O as resolveDynamicComponent,
    P as createCommentVNode,
    t as toDisplayString,
    Q as withKeys,
    R as renderSlot,
    b as createTextVNode,
    S as vShow,
    U as Transition,
    V as isClient,
    W as isString,
    X as isVNode,
    Y as render,
    Z as hasOwn,
    $ as isObject,
    a0 as isUndefined,
    a1 as isFunction,
    a2 as isElement,
    _ as _export_sfc$1,
    a3 as usePageFrontmatter,
    a4 as Fragment,
    a5 as renderList,
    a6 as isArray,
    a7 as useRoute,
    h as unref,
    a8 as mergeProps,
    a9 as isLinkHttp,
    aa as isLinkMailto,
    ab as isLinkTel,
    ac as useSiteData,
    ad as useSiteLocaleData,
    ae as useDarkMode,
    af as h,
    ag as withBase,
    ah as ClientOnly,
    u as useRouteLocale,
    g as useThemeLocaleData,
    ai as removeLeadingSlash,
    aj as removeEndingSlash,
    ak as useRouter,
    al as useNavLink,
    e as createStaticVNode,
    am as usePageData,
    an as useSidebarItems,
    ao as isPlainObject,
    ap as useToggle,
    aq as ElMessage,
    ar as pushScopeId,
    as as popScopeId,
    at as onUnmounted,
    au as useScrollPromise,
    av as clone,
    aw as Schema,
    ax as get,
    ay as useI18n,
    az as onBeforeMount,
    aA as ElAlert,
    aB as post,
    aC as isNullable,
    aD as createSlots
} from "./app.b7461f39.js";

const FOCUSABLE_ELEMENT_SELECTORS = 'a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])',
    isVisible = e => getComputedStyle(e).position === "fixed" ? !1 : e.offsetParent !== null,
    obtainAllFocusableElements = e => Array.from(e.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter(t => isFocusable(t) && isVisible(t)),
    isFocusable = e => {
        if (e.tabIndex > 0 || e.tabIndex === 0 && e.getAttribute("tabIndex") !== null) return !0;
        if (e.disabled) return !1;
        switch (e.nodeName) {
            case"A":
                return !!e.href && e.rel !== "ignore";
            case"INPUT":
                return !(e.type === "hidden" || e.type === "file");
            case"BUTTON":
            case"SELECT":
            case"TEXTAREA":
                return !0;
            default:
                return !1
        }
    }, FOCUSABLE_CHILDREN = "_trap-focus-children", FOCUS_STACK = [], FOCUS_HANDLER = e => {
        if (FOCUS_STACK.length === 0) return;
        const t = FOCUS_STACK[FOCUS_STACK.length - 1][FOCUSABLE_CHILDREN];
        if (t.length > 0 && e.code === EVENT_CODE.tab) {
            if (t.length === 1) {
                e.preventDefault(), document.activeElement !== t[0] && t[0].focus();
                return
            }
            const r = e.shiftKey, n = e.target === t[0], o = e.target === t[t.length - 1];
            n && r && (e.preventDefault(), t[t.length - 1].focus()), o && !r && (e.preventDefault(), t[0].focus())
        }
    }, TrapFocus = {
        beforeMount(e) {
            e[FOCUSABLE_CHILDREN] = obtainAllFocusableElements(e), FOCUS_STACK.push(e), FOCUS_STACK.length <= 1 && document.addEventListener("keydown", FOCUS_HANDLER)
        }, updated(e) {
            nextTick(() => {
                e[FOCUSABLE_CHILDREN] = obtainAllFocusableElements(e)
            })
        }, unmounted() {
            FOCUS_STACK.shift(), FOCUS_STACK.length === 0 && document.removeEventListener("keydown", FOCUS_HANDLER)
        }
    }, _sfc_main$r = defineComponent({
        name: "ElMessageBox",
        directives: {TrapFocus},
        components: {ElButton, ElFocusTrap, ElInput, ElOverlay, ElIcon, ...TypeComponents},
        inheritAttrs: !1,
        props: {
            buttonSize: {type: String, validator: isValidComponentSize},
            modal: {type: Boolean, default: !0},
            lockScroll: {type: Boolean, default: !0},
            showClose: {type: Boolean, default: !0},
            closeOnClickModal: {type: Boolean, default: !0},
            closeOnPressEscape: {type: Boolean, default: !0},
            closeOnHashChange: {type: Boolean, default: !0},
            center: Boolean,
            draggable: Boolean,
            roundButton: {default: !1, type: Boolean},
            container: {type: String, default: "body"},
            boxType: {type: String, default: ""}
        },
        emits: ["vanish", "action"],
        setup(e, {emit: t}) {
            const {
                    locale: r,
                    zIndex: n,
                    ns: o,
                    size: a
                } = useGlobalComponentSettings("message-box", computed(() => e.buttonSize)), {t: l} = r, {nextZIndex: u} = n,
                c = ref(!1), i = reactive({
                    autofocus: !0,
                    beforeClose: null,
                    callback: null,
                    cancelButtonText: "",
                    cancelButtonClass: "",
                    confirmButtonText: "",
                    confirmButtonClass: "",
                    customClass: "",
                    customStyle: {},
                    dangerouslyUseHTMLString: !1,
                    distinguishCancelAndClose: !1,
                    icon: "",
                    inputPattern: null,
                    inputPlaceholder: "",
                    inputType: "text",
                    inputValue: null,
                    inputValidator: null,
                    inputErrorMessage: "",
                    message: null,
                    modalFade: !0,
                    modalClass: "",
                    showCancelButton: !1,
                    showConfirmButton: !0,
                    type: "",
                    title: void 0,
                    showInput: !1,
                    action: "",
                    confirmButtonLoading: !1,
                    cancelButtonLoading: !1,
                    confirmButtonDisabled: !1,
                    editorErrorMessage: "",
                    validateError: !1,
                    zIndex: u()
                }), _ = computed(() => {
                    const b = i.type;
                    return {[o.bm("icon", b)]: b && TypeComponentsMap[b]}
                }), d = useId(), p = useId(), w = computed(() => i.icon || TypeComponentsMap[i.type] || ""),
                B = computed(() => !!i.message), y = ref(), v = ref(), E = ref(), k = ref(), R = ref(),
                L = computed(() => i.confirmButtonClass);
            watch(() => i.inputValue, async b => {
                await nextTick(), e.boxType === "prompt" && b !== null && M()
            }, {immediate: !0}), watch(() => c.value, b => {
                var x, m;
                b && (e.boxType !== "prompt" && (i.autofocus ? E.value = (m = (x = R.value) == null ? void 0 : x.$el) != null ? m : y.value : E.value = y.value), i.zIndex = u()), e.boxType === "prompt" && (b ? nextTick().then(() => {
                    var g;
                    k.value && k.value.$el && (i.autofocus ? E.value = (g = K()) != null ? g : y.value : E.value = y.value)
                }) : (i.editorErrorMessage = "", i.validateError = !1))
            });
            const I = computed(() => e.draggable);
            useDraggable(y, v, I), onMounted(async () => {
                await nextTick(), e.closeOnHashChange && window.addEventListener("hashchange", D)
            }), onBeforeUnmount(() => {
                e.closeOnHashChange && window.removeEventListener("hashchange", D)
            });

            function D() {
                !c.value || (c.value = !1, nextTick(() => {
                    i.action && t("action", i.action)
                }))
            }

            const O = () => {
                e.closeOnClickModal && S(i.distinguishCancelAndClose ? "close" : "cancel")
            }, V = useSameTarget(O), W = b => {
                if (i.inputType !== "textarea") return b.preventDefault(), S("confirm")
            }, S = b => {
                var x;
                e.boxType === "prompt" && b === "confirm" && !M() || (i.action = b, i.beforeClose ? (x = i.beforeClose) == null || x.call(i, b, i, D) : D())
            }, M = () => {
                if (e.boxType === "prompt") {
                    const b = i.inputPattern;
                    if (b && !b.test(i.inputValue || "")) return i.editorErrorMessage = i.inputErrorMessage || l("el.messagebox.error"), i.validateError = !0, !1;
                    const x = i.inputValidator;
                    if (typeof x == "function") {
                        const m = x(i.inputValue);
                        if (m === !1) return i.editorErrorMessage = i.inputErrorMessage || l("el.messagebox.error"), i.validateError = !0, !1;
                        if (typeof m == "string") return i.editorErrorMessage = m, i.validateError = !0, !1
                    }
                }
                return i.editorErrorMessage = "", i.validateError = !1, !0
            }, K = () => {
                const b = k.value.$refs;
                return b.input || b.textarea
            }, P = () => {
                S("close")
            }, j = () => {
                e.closeOnPressEscape && P()
            };
            return e.lockScroll && useLockscreen(c), {
                ...toRefs(i),
                ns: o,
                overlayEvent: V,
                visible: c,
                hasMessage: B,
                typeClass: _,
                contentId: d,
                inputId: p,
                btnSize: a,
                iconComponent: w,
                confirmButtonClasses: L,
                rootRef: y,
                focusStartRef: E,
                headerRef: v,
                inputRef: k,
                confirmRef: R,
                doClose: D,
                handleClose: P,
                onCloseRequested: j,
                handleWrapperClick: O,
                handleInputEnter: W,
                handleAction: S,
                t: l
            }
        }
    }), _hoisted_1$m = ["aria-label", "aria-describedby"], _hoisted_2$g = ["aria-label"], _hoisted_3$c = ["id"];

function _sfc_render$1(e, t, r, n, o, a) {
    const l = resolveComponent("el-icon"), u = resolveComponent("close"), c = resolveComponent("el-input"),
        i = resolveComponent("el-button"), _ = resolveComponent("el-focus-trap"), d = resolveComponent("el-overlay");
    return openBlock(), createBlock(Transition, {
        name: "fade-in-linear",
        onAfterLeave: t[11] || (t[11] = p => e.$emit("vanish")),
        persisted: ""
    }, {
        default: withCtx(() => [withDirectives(createVNode(d, {
            "z-index": e.zIndex,
            "overlay-class": [e.ns.is("message-box"), e.modalClass],
            mask: e.modal
        }, {
            default: withCtx(() => [createBaseVNode("div", {
                role: "dialog",
                "aria-label": e.title,
                "aria-modal": "true",
                "aria-describedby": e.showInput ? void 0 : e.contentId,
                class: normalizeClass(`${e.ns.namespace.value}-overlay-message-box`),
                onClick: t[8] || (t[8] = (...p) => e.overlayEvent.onClick && e.overlayEvent.onClick(...p)),
                onMousedown: t[9] || (t[9] = (...p) => e.overlayEvent.onMousedown && e.overlayEvent.onMousedown(...p)),
                onMouseup: t[10] || (t[10] = (...p) => e.overlayEvent.onMouseup && e.overlayEvent.onMouseup(...p))
            }, [createVNode(_, {
                loop: "",
                trapped: e.visible,
                "focus-trap-el": e.rootRef,
                "focus-start-el": e.focusStartRef,
                onReleaseRequested: e.onCloseRequested
            }, {
                default: withCtx(() => [createBaseVNode("div", {
                    ref: "rootRef",
                    class: normalizeClass([e.ns.b(), e.customClass, e.ns.is("draggable", e.draggable), {[e.ns.m("center")]: e.center}]),
                    style: normalizeStyle(e.customStyle),
                    tabindex: "-1",
                    onClick: t[7] || (t[7] = withModifiers(() => {
                    }, ["stop"]))
                }, [e.title !== null && e.title !== void 0 ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    ref: "headerRef",
                    class: normalizeClass(e.ns.e("header"))
                }, [createBaseVNode("div", {class: normalizeClass(e.ns.e("title"))}, [e.iconComponent && e.center ? (openBlock(), createBlock(l, {
                    key: 0,
                    class: normalizeClass([e.ns.e("status"), e.typeClass])
                }, {
                    default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(e.iconComponent)))]),
                    _: 1
                }, 8, ["class"])) : createCommentVNode("v-if", !0), createBaseVNode("span", null, toDisplayString(e.title), 1)], 2), e.showClose ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    type: "button",
                    class: normalizeClass(e.ns.e("headerbtn")),
                    "aria-label": e.t("el.messagebox.close"),
                    onClick: t[0] || (t[0] = p => e.handleAction(e.distinguishCancelAndClose ? "close" : "cancel")),
                    onKeydown: t[1] || (t[1] = withKeys(withModifiers(p => e.handleAction(e.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
                }, [createVNode(l, {class: normalizeClass(e.ns.e("close"))}, {
                    default: withCtx(() => [createVNode(u)]),
                    _: 1
                }, 8, ["class"])], 42, _hoisted_2$g)) : createCommentVNode("v-if", !0)], 2)) : createCommentVNode("v-if", !0), createBaseVNode("div", {
                    id: e.contentId,
                    class: normalizeClass(e.ns.e("content"))
                }, [createBaseVNode("div", {class: normalizeClass(e.ns.e("container"))}, [e.iconComponent && !e.center && e.hasMessage ? (openBlock(), createBlock(l, {
                    key: 0,
                    class: normalizeClass([e.ns.e("status"), e.typeClass])
                }, {
                    default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(e.iconComponent)))]),
                    _: 1
                }, 8, ["class"])) : createCommentVNode("v-if", !0), e.hasMessage ? (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(e.ns.e("message"))
                }, [renderSlot(e.$slots, "default", {}, () => [e.dangerouslyUseHTMLString ? (openBlock(), createBlock(resolveDynamicComponent(e.showInput ? "label" : "p"), {
                    key: 1,
                    for: e.showInput ? e.inputId : void 0,
                    innerHTML: e.message
                }, null, 8, ["for", "innerHTML"])) : (openBlock(), createBlock(resolveDynamicComponent(e.showInput ? "label" : "p"), {
                    key: 0,
                    for: e.showInput ? e.inputId : void 0
                }, {
                    default: withCtx(() => [createTextVNode(toDisplayString(e.dangerouslyUseHTMLString ? "" : e.message), 1)]),
                    _: 1
                }, 8, ["for"]))])], 2)) : createCommentVNode("v-if", !0)], 2), withDirectives(createBaseVNode("div", {class: normalizeClass(e.ns.e("input"))}, [createVNode(c, {
                    id: e.inputId,
                    ref: "inputRef",
                    modelValue: e.inputValue,
                    "onUpdate:modelValue": t[2] || (t[2] = p => e.inputValue = p),
                    type: e.inputType,
                    placeholder: e.inputPlaceholder,
                    "aria-invalid": e.validateError,
                    class: normalizeClass({invalid: e.validateError}),
                    onKeydown: withKeys(e.handleInputEnter, ["enter"])
                }, null, 8, ["id", "modelValue", "type", "placeholder", "aria-invalid", "class", "onKeydown"]), createBaseVNode("div", {
                    class: normalizeClass(e.ns.e("errormsg")),
                    style: normalizeStyle({visibility: e.editorErrorMessage ? "visible" : "hidden"})
                }, toDisplayString(e.editorErrorMessage), 7)], 2), [[vShow, e.showInput]])], 10, _hoisted_3$c), createBaseVNode("div", {class: normalizeClass(e.ns.e("btns"))}, [e.showCancelButton ? (openBlock(), createBlock(i, {
                    key: 0,
                    loading: e.cancelButtonLoading,
                    class: normalizeClass([e.cancelButtonClass]),
                    round: e.roundButton,
                    size: e.btnSize,
                    onClick: t[3] || (t[3] = p => e.handleAction("cancel")),
                    onKeydown: t[4] || (t[4] = withKeys(withModifiers(p => e.handleAction("cancel"), ["prevent"]), ["enter"]))
                }, {
                    default: withCtx(() => [createTextVNode(toDisplayString(e.cancelButtonText || e.t("el.messagebox.cancel")), 1)]),
                    _: 1
                }, 8, ["loading", "class", "round", "size"])) : createCommentVNode("v-if", !0), withDirectives(createVNode(i, {
                    ref: "confirmRef",
                    type: "primary",
                    loading: e.confirmButtonLoading,
                    class: normalizeClass([e.confirmButtonClasses]),
                    round: e.roundButton,
                    disabled: e.confirmButtonDisabled,
                    size: e.btnSize,
                    onClick: t[5] || (t[5] = p => e.handleAction("confirm")),
                    onKeydown: t[6] || (t[6] = withKeys(withModifiers(p => e.handleAction("confirm"), ["prevent"]), ["enter"]))
                }, {
                    default: withCtx(() => [createTextVNode(toDisplayString(e.confirmButtonText || e.t("el.messagebox.confirm")), 1)]),
                    _: 1
                }, 8, ["loading", "class", "round", "disabled", "size"]), [[vShow, e.showConfirmButton]])], 2)], 6)]),
                _: 3
            }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onReleaseRequested"])], 42, _hoisted_1$m)]), _: 3
        }, 8, ["z-index", "overlay-class", "mask"]), [[vShow, e.visible]])]), _: 3
    })
}

var MessageBoxConstructor = _export_sfc(_sfc_main$r, [["render", _sfc_render$1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/message-box/src/index.vue"]]);
const messageInstance = new Map, getAppendToElement = e => {
    let t = document.body;
    return e.appendTo && (isString(e.appendTo) && (t = document.querySelector(e.appendTo)), isElement(e.appendTo) && (t = e.appendTo), isElement(t) || (t = document.body)), t
}, initInstance = (e, t, r = null) => {
    const n = createVNode(MessageBoxConstructor, e, isFunction(e.message) || isVNode(e.message) ? {default: isFunction(e.message) ? e.message : () => e.message} : null);
    return n.appContext = r, render(n, t), getAppendToElement(e).appendChild(t.firstElementChild), n.component
}, genContainer = () => document.createElement("div"), showMessage = (e, t) => {
    const r = genContainer();
    e.onVanish = () => {
        render(null, r), messageInstance.delete(o)
    }, e.onAction = a => {
        const l = messageInstance.get(o);
        let u;
        e.showInput ? u = {
            value: o.inputValue,
            action: a
        } : u = a, e.callback ? e.callback(u, n.proxy) : a === "cancel" || a === "close" ? e.distinguishCancelAndClose && a !== "cancel" ? l.reject("close") : l.reject("cancel") : l.resolve(u)
    };
    const n = initInstance(e, r, t), o = n.proxy;
    for (const a in e) hasOwn(e, a) && !hasOwn(o.$props, a) && (o[a] = e[a]);
    return o.visible = !0, o
};

function MessageBox(e, t = null) {
    if (!isClient) return Promise.reject();
    let r;
    return isString(e) || isVNode(e) ? e = {message: e} : r = e.callback, new Promise((n, o) => {
        const a = showMessage(e, t != null ? t : MessageBox._context);
        messageInstance.set(a, {options: e, callback: r, resolve: n, reject: o})
    })
}

const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"], MESSAGE_BOX_DEFAULT_OPTS = {
    alert: {closeOnPressEscape: !1, closeOnClickModal: !1},
    confirm: {showCancelButton: !0},
    prompt: {showCancelButton: !0, showInput: !0}
};
MESSAGE_BOX_VARIANTS.forEach(e => {
    MessageBox[e] = messageBoxFactory(e)
});

function messageBoxFactory(e) {
    return (t, r, n, o) => {
        let a = "";
        return isObject(r) ? (n = r, a = "") : isUndefined(r) ? a = "" : a = r, MessageBox(Object.assign({
            title: a,
            message: t,
            type: "", ...MESSAGE_BOX_DEFAULT_OPTS[e]
        }, n, {boxType: e}), o)
    }
}

MessageBox.close = () => {
    messageInstance.forEach((e, t) => {
        t.doClose()
    }), messageInstance.clear()
};
MessageBox._context = null;
const _MessageBox = MessageBox;
_MessageBox.install = e => {
    _MessageBox._context = e._context, e.config.globalProperties.$msgbox = _MessageBox, e.config.globalProperties.$messageBox = _MessageBox, e.config.globalProperties.$alert = _MessageBox.alert, e.config.globalProperties.$confirm = _MessageBox.confirm, e.config.globalProperties.$prompt = _MessageBox.prompt
};
const ElMessageBox = _MessageBox, _sfc_main$q = {}, _hoisted_1$l = {class: "theme-default-content"};

function _sfc_render(e, t) {
    const r = resolveComponent("Content");
    return openBlock(), createElementBlock("div", _hoisted_1$l, [createVNode(r)])
}

var HomeContent = _export_sfc$1(_sfc_main$q, [["render", _sfc_render], ["__file", "HomeContent.vue"]]);
const _hoisted_1$k = {key: 0, class: "features"}, _sfc_main$p = defineComponent({
    __name: "HomeFeatures", setup(e) {
        const t = usePageFrontmatter(), r = computed(() => isArray(t.value.features) ? t.value.features : []);
        return (n, o) => r.value.length ? (openBlock(), createElementBlock("div", _hoisted_1$k, [(openBlock(!0), createElementBlock(Fragment, null, renderList(r.value, a => (openBlock(), createElementBlock("div", {
            key: a.title,
            class: "feature"
        }, [createBaseVNode("h2", null, toDisplayString(a.title), 1), createBaseVNode("p", null, toDisplayString(a.details), 1)]))), 128))])) : createCommentVNode("", !0)
    }
});
var HomeFeatures = _export_sfc$1(_sfc_main$p, [["__file", "HomeFeatures.vue"]]);
const _hoisted_1$j = ["innerHTML"], _hoisted_2$f = ["textContent"], _sfc_main$o = defineComponent({
    __name: "HomeFooter", setup(e) {
        const t = usePageFrontmatter(), r = computed(() => t.value.footer), n = computed(() => t.value.footerHtml);
        return (o, a) => r.value ? (openBlock(), createElementBlock(Fragment, {key: 0}, [n.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "footer",
            innerHTML: r.value
        }, null, 8, _hoisted_1$j)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: "footer",
            textContent: toDisplayString(r.value)
        }, null, 8, _hoisted_2$f))], 64)) : createCommentVNode("", !0)
    }
});
var HomeFooter = _export_sfc$1(_sfc_main$o, [["__file", "HomeFooter.vue"]]);
const _hoisted_1$i = ["href", "rel", "target", "aria-label"], __default__ = defineComponent({inheritAttrs: !1}),
    _sfc_main$n = defineComponent({
        ...__default__, __name: "AutoLink", props: {item: {type: Object, required: !0}}, setup(e) {
            const t = e, r = useRoute(), n = useSiteData(), {item: o} = toRefs(t),
                a = computed(() => isLinkHttp(o.value.link)),
                l = computed(() => isLinkMailto(o.value.link) || isLinkTel(o.value.link)), u = computed(() => {
                    if (!l.value) {
                        if (o.value.target) return o.value.target;
                        if (a.value) return "_blank"
                    }
                }), c = computed(() => u.value === "_blank"), i = computed(() => !a.value && !l.value && !c.value),
                _ = computed(() => {
                    if (!l.value) {
                        if (o.value.rel) return o.value.rel;
                        if (c.value) return "noopener noreferrer"
                    }
                }), d = computed(() => o.value.ariaLabel || o.value.text), p = computed(() => {
                    const y = Object.keys(n.value.locales);
                    return y.length ? !y.some(v => v === o.value.link) : o.value.link !== "/"
                }), w = computed(() => p.value ? r.path.startsWith(o.value.link) : !1),
                B = computed(() => i.value ? o.value.activeMatch ? new RegExp(o.value.activeMatch).test(r.path) : w.value : !1);
            return (y, v) => {
                const E = resolveComponent("RouterLink"), k = resolveComponent("AutoLinkExternalIcon");
                return i.value ? (openBlock(), createBlock(E, mergeProps({
                    key: 0,
                    class: {"router-link-active": B.value},
                    to: unref(o).link,
                    "aria-label": d.value
                }, y.$attrs), {
                    default: withCtx(() => [renderSlot(y.$slots, "before"), createTextVNode(" " + toDisplayString(unref(o).text) + " ", 1), renderSlot(y.$slots, "after")]),
                    _: 3
                }, 16, ["class", "to", "aria-label"])) : (openBlock(), createElementBlock("a", mergeProps({
                    key: 1,
                    class: "external-link",
                    href: unref(o).link,
                    rel: _.value,
                    target: u.value,
                    "aria-label": d.value
                }, y.$attrs), [renderSlot(y.$slots, "before"), createTextVNode(" " + toDisplayString(unref(o).text) + " ", 1), c.value ? (openBlock(), createBlock(k, {key: 0})) : createCommentVNode("", !0), renderSlot(y.$slots, "after")], 16, _hoisted_1$i))
            }
        }
    });
var AutoLink = _export_sfc$1(_sfc_main$n, [["__file", "AutoLink.vue"]]);
const _hoisted_1$h = {class: "hero"}, _hoisted_2$e = {key: 0, id: "main-title"},
    _hoisted_3$b = {key: 1, class: "description"}, _hoisted_4$9 = {key: 2, class: "actions"},
    _sfc_main$m = defineComponent({
        __name: "HomeHero", setup(e) {
            const t = usePageFrontmatter(), r = useSiteLocaleData(), n = useDarkMode(),
                o = computed(() => n.value && t.value.heroImageDark !== void 0 ? t.value.heroImageDark : t.value.heroImage),
                a = computed(() => t.value.heroText === null ? null : t.value.heroText || r.value.title || "Hello"),
                l = computed(() => t.value.heroAlt || a.value || "hero"),
                u = computed(() => t.value.tagline === null ? null : t.value.tagline || r.value.description || "Welcome to your VuePress site"),
                c = computed(() => isArray(t.value.actions) ? t.value.actions.map(({
                                                                                       text: _,
                                                                                       link: d,
                                                                                       type: p = "primary"
                                                                                   }) => ({
                    text: _,
                    link: d,
                    type: p
                })) : []), i = () => {
                    if (!o.value) return null;
                    const _ = h("img", {src: withBase(o.value), alt: l.value});
                    return t.value.heroImageDark === void 0 ? _ : h(ClientOnly, () => _)
                };
            return (_, d) => (openBlock(), createElementBlock("header", _hoisted_1$h, [createVNode(i), a.value ? (openBlock(), createElementBlock("h1", _hoisted_2$e, toDisplayString(a.value), 1)) : createCommentVNode("", !0), u.value ? (openBlock(), createElementBlock("p", _hoisted_3$b, toDisplayString(u.value), 1)) : createCommentVNode("", !0), c.value.length ? (openBlock(), createElementBlock("p", _hoisted_4$9, [(openBlock(!0), createElementBlock(Fragment, null, renderList(c.value, p => (openBlock(), createBlock(AutoLink, {
                key: p.text,
                class: normalizeClass(["action-button", [p.type]]),
                item: p
            }, null, 8, ["class", "item"]))), 128))])) : createCommentVNode("", !0)]))
        }
    });
var HomeHero = _export_sfc$1(_sfc_main$m, [["__file", "HomeHero.vue"]]);
const _hoisted_1$g = {class: "home"}, _sfc_main$l = defineComponent({
    __name: "Home", setup(e) {
        return (t, r) => (openBlock(), createElementBlock("main", _hoisted_1$g, [createVNode(HomeHero), createVNode(HomeFeatures), createVNode(HomeContent), createVNode(HomeFooter)]))
    }
});
var Home = _export_sfc$1(_sfc_main$l, [["__file", "Home.vue"]]);
const _sfc_main$k = defineComponent({
    __name: "NavbarBrand", setup(e) {
        const t = useRouteLocale(), r = useSiteLocaleData(), n = useThemeLocaleData(), o = useDarkMode(),
            a = computed(() => n.value.home || t.value), l = computed(() => r.value.title),
            u = computed(() => o.value && n.value.logoDark !== void 0 ? n.value.logoDark : n.value.logo), c = () => {
                if (!u.value) return null;
                const i = h("img", {class: "logo", src: withBase(u.value), alt: l.value});
                return n.value.logoDark === void 0 ? i : h(ClientOnly, () => i)
            };
        return (i, _) => {
            const d = resolveComponent("RouterLink");
            return openBlock(), createBlock(d, {to: a.value}, {
                default: withCtx(() => [createVNode(c), l.value ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(["site-name", {"can-hide": u.value}])
                }, toDisplayString(l.value), 3)) : createCommentVNode("", !0)]), _: 1
            }, 8, ["to"])
        }
    }
});
var NavbarBrand = _export_sfc$1(_sfc_main$k, [["__file", "NavbarBrand.vue"]]);
const _sfc_main$j = defineComponent({
    __name: "DropdownTransition", setup(e) {
        const t = n => {
            n.style.height = n.scrollHeight + "px"
        }, r = n => {
            n.style.height = ""
        };
        return (n, o) => (openBlock(), createBlock(Transition, {
            name: "dropdown",
            onEnter: t,
            onAfterEnter: r,
            onBeforeLeave: t
        }, {default: withCtx(() => [renderSlot(n.$slots, "default")]), _: 3}))
    }
});
var DropdownTransition = _export_sfc$1(_sfc_main$j, [["__file", "DropdownTransition.vue"]]);
const _hoisted_1$f = ["aria-label"], _hoisted_2$d = {class: "title"},
    _hoisted_3$a = createBaseVNode("span", {class: "arrow down"}, null, -1), _hoisted_4$8 = ["aria-label"],
    _hoisted_5$7 = {class: "title"}, _hoisted_6$7 = {class: "navbar-dropdown"},
    _hoisted_7$4 = {class: "navbar-dropdown-subtitle"}, _hoisted_8$3 = {key: 1},
    _hoisted_9$3 = {class: "navbar-dropdown-subitem-wrapper"}, _sfc_main$i = defineComponent({
        __name: "NavbarDropdown", props: {item: {type: Object, required: !0}}, setup(e) {
            const t = e, {item: r} = toRefs(t), n = computed(() => r.value.ariaLabel || r.value.text), o = ref(!1),
                a = useRoute();
            watch(() => a.path, () => {
                o.value = !1
            });
            const l = c => {
                c.detail === 0 ? o.value = !o.value : o.value = !1
            }, u = (c, i) => i[i.length - 1] === c;
            return (c, i) => (openBlock(), createElementBlock("div", {class: normalizeClass(["navbar-dropdown-wrapper", {open: o.value}])}, [createBaseVNode("button", {
                class: "navbar-dropdown-title",
                type: "button",
                "aria-label": n.value,
                onClick: l
            }, [createBaseVNode("span", _hoisted_2$d, toDisplayString(unref(r).text), 1), _hoisted_3$a], 8, _hoisted_1$f), createBaseVNode("button", {
                class: "navbar-dropdown-title-mobile",
                type: "button",
                "aria-label": n.value,
                onClick: i[0] || (i[0] = _ => o.value = !o.value)
            }, [createBaseVNode("span", _hoisted_5$7, toDisplayString(unref(r).text), 1), createBaseVNode("span", {class: normalizeClass(["arrow", o.value ? "down" : "right"])}, null, 2)], 8, _hoisted_4$8), createVNode(DropdownTransition, null, {
                default: withCtx(() => [withDirectives(createBaseVNode("ul", _hoisted_6$7, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(r).children, _ => (openBlock(), createElementBlock("li", {
                    key: _.text,
                    class: "navbar-dropdown-item"
                }, [_.children ? (openBlock(), createElementBlock(Fragment, {key: 0}, [createBaseVNode("h4", _hoisted_7$4, [_.link ? (openBlock(), createBlock(AutoLink, {
                    key: 0,
                    item: _,
                    onFocusout: d => u(_, unref(r).children) && _.children.length === 0 && (o.value = !1)
                }, null, 8, ["item", "onFocusout"])) : (openBlock(), createElementBlock("span", _hoisted_8$3, toDisplayString(_.text), 1))]), createBaseVNode("ul", _hoisted_9$3, [(openBlock(!0), createElementBlock(Fragment, null, renderList(_.children, d => (openBlock(), createElementBlock("li", {
                    key: d.link,
                    class: "navbar-dropdown-subitem"
                }, [createVNode(AutoLink, {
                    item: d,
                    onFocusout: p => u(d, _.children) && u(_, unref(r).children) && (o.value = !1)
                }, null, 8, ["item", "onFocusout"])]))), 128))])], 64)) : (openBlock(), createBlock(AutoLink, {
                    key: 1,
                    item: _,
                    onFocusout: d => u(_, unref(r).children) && (o.value = !1)
                }, null, 8, ["item", "onFocusout"]))]))), 128))], 512), [[vShow, o.value]])]), _: 1
            })], 2))
        }
    });
var NavbarDropdown = _export_sfc$1(_sfc_main$i, [["__file", "NavbarDropdown.vue"]]);
const normalizePath = e => decodeURI(e).replace(/#.*$/, "").replace(/(index)?\.(md|html)$/, ""),
    isActiveLink = (e, t) => {
        if (t.hash === e) return !0;
        const r = normalizePath(t.path), n = normalizePath(e);
        return r === n
    },
    isActiveSidebarItem = (e, t) => e.link && isActiveLink(e.link, t) ? !0 : e.children ? e.children.some(r => isActiveSidebarItem(r, t)) : !1,
    resolveRepoType = e => !isLinkHttp(e) || /github\.com/.test(e) ? "GitHub" : /bitbucket\.org/.test(e) ? "Bitbucket" : /gitlab\.com/.test(e) ? "GitLab" : /gitee\.com/.test(e) ? "Gitee" : null,
    editLinkPatterns = {
        GitHub: ":repo/edit/:branch/:path",
        GitLab: ":repo/-/edit/:branch/:path",
        Gitee: ":repo/edit/:branch/:path",
        Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
    }, resolveEditLinkPatterns = ({docsRepo: e, editLinkPattern: t}) => {
        if (t) return t;
        const r = resolveRepoType(e);
        return r !== null ? editLinkPatterns[r] : null
    }, resolveEditLink = ({docsRepo: e, docsBranch: t, docsDir: r, filePathRelative: n, editLinkPattern: o}) => {
        if (!n) return null;
        const a = resolveEditLinkPatterns({docsRepo: e, editLinkPattern: o});
        return a ? a.replace(/:repo/, isLinkHttp(e) ? e : `https://github.com/${e}`).replace(/:branch/, t).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(r)}/${n}`)) : null
    }, _hoisted_1$e = {key: 0, class: "navbar-items"}, _sfc_main$h = defineComponent({
        __name: "NavbarItems", setup(e) {
            const t = () => {
                const i = useRouter(), _ = useRouteLocale(), d = useSiteLocaleData(), p = useThemeLocaleData();
                return computed(() => {
                    var k, R, L;
                    const w = Object.keys(d.value.locales);
                    if (w.length < 2) return [];
                    const B = i.currentRoute.value.path, y = i.currentRoute.value.fullPath, v = i.currentRoute.value.hash;
                    return [{
                        text: (k = p.value.selectLanguageText) != null ? k : "unknown language",
                        ariaLabel: (L = (R = p.value.selectLanguageAriaLabel) != null ? R : p.value.selectLanguageText) != null ? L : "unknown language",
                        children: w.map(I => {
                            var M, K, P, j, b, x;
                            const D = (K = (M = d.value.locales) == null ? void 0 : M[I]) != null ? K : {},
                                O = (j = (P = p.value.locales) == null ? void 0 : P[I]) != null ? j : {}, V = `${D.lang}`,
                                W = (b = O.selectLanguageName) != null ? b : V;
                            let S;
                            if (V === d.value.lang) S = y; else {
                                const m = B.replace(_.value, I);
                                i.getRoutes().some(g => g.path === m) ? S = `${m}${v}` : S = (x = O.home) != null ? x : I
                            }
                            return {text: W, link: S}
                        })
                    }]
                })
            }, r = () => {
                const i = useThemeLocaleData(), _ = computed(() => i.value.repo),
                    d = computed(() => _.value ? resolveRepoType(_.value) : null),
                    p = computed(() => _.value && !isLinkHttp(_.value) ? `https://github.com/${_.value}` : _.value),
                    w = computed(() => p.value ? i.value.repoLabel ? i.value.repoLabel : d.value === null ? "Source" : d.value : null);
                return computed(() => !p.value || !w.value ? [] : [{text: w.value, link: p.value}])
            }, n = i => isString(i) ? useNavLink(i) : i.children ? {...i, children: i.children.map(n)} : i, a = (() => {
                const i = useThemeLocaleData();
                return computed(() => (i.value.navbar || []).map(n))
            })(), l = t(), u = r(), c = computed(() => [...a.value, ...l.value, ...u.value]);
            return (i, _) => c.value.length ? (openBlock(), createElementBlock("nav", _hoisted_1$e, [(openBlock(!0), createElementBlock(Fragment, null, renderList(c.value, d => (openBlock(), createElementBlock("div", {
                key: d.text,
                class: "navbar-item"
            }, [d.children ? (openBlock(), createBlock(NavbarDropdown, {
                key: 0,
                item: d
            }, null, 8, ["item"])) : (openBlock(), createBlock(AutoLink, {
                key: 1,
                item: d
            }, null, 8, ["item"]))]))), 128))])) : createCommentVNode("", !0)
        }
    });
var NavbarItems = _export_sfc$1(_sfc_main$h, [["__file", "NavbarItems.vue"]]);
const _hoisted_1$d = ["title"], _hoisted_2$c = {class: "icon", focusable: "false", viewBox: "0 0 32 32"},
    _hoisted_3$9 = createStaticVNode('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>', 9),
    _hoisted_12$1 = [_hoisted_3$9], _hoisted_13$1 = {class: "icon", focusable: "false", viewBox: "0 0 32 32"},
    _hoisted_14$1 = createBaseVNode("path", {
        d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",
        fill: "currentColor"
    }, null, -1), _hoisted_15$1 = [_hoisted_14$1], _sfc_main$g = defineComponent({
        __name: "ToggleColorModeButton", setup(e) {
            const t = useThemeLocaleData(), r = useDarkMode(), n = () => {
                r.value = !r.value
            };
            return (o, a) => (openBlock(), createElementBlock("button", {
                class: "toggle-color-mode-button",
                title: unref(t).toggleColorMode,
                onClick: n
            }, [withDirectives((openBlock(), createElementBlock("svg", _hoisted_2$c, _hoisted_12$1, 512)), [[vShow, !unref(r)]]), withDirectives((openBlock(), createElementBlock("svg", _hoisted_13$1, _hoisted_15$1, 512)), [[vShow, unref(r)]])], 8, _hoisted_1$d))
        }
    });
var ToggleColorModeButton = _export_sfc$1(_sfc_main$g, [["__file", "ToggleColorModeButton.vue"]]);
const _hoisted_1$c = ["title"], _hoisted_2$b = createBaseVNode("div", {
        class: "icon",
        "aria-hidden": "true"
    }, [createBaseVNode("span"), createBaseVNode("span"), createBaseVNode("span")], -1), _hoisted_3$8 = [_hoisted_2$b],
    _sfc_main$f = defineComponent({
        __name: "ToggleSidebarButton", emits: ["toggle"], setup(e) {
            const t = useThemeLocaleData();
            return (r, n) => (openBlock(), createElementBlock("div", {
                class: "toggle-sidebar-button",
                title: unref(t).toggleSidebar,
                "aria-expanded": "false",
                role: "button",
                tabindex: "0",
                onClick: n[0] || (n[0] = o => r.$emit("toggle"))
            }, _hoisted_3$8, 8, _hoisted_1$c))
        }
    });
var ToggleSidebarButton = _export_sfc$1(_sfc_main$f, [["__file", "ToggleSidebarButton.vue"]]);
const _sfc_main$e = defineComponent({
    __name: "Navbar", emits: ["toggle-sidebar"], setup(e) {
        const t = useThemeLocaleData(), r = ref(null), n = ref(null), o = ref(0),
            a = computed(() => o.value ? {maxWidth: o.value + "px"} : {});
        onMounted(() => {
            const c = l(r.value, "paddingLeft") + l(r.value, "paddingRight"), i = () => {
                var _;
                window.innerWidth <= 719 ? o.value = 0 : o.value = r.value.offsetWidth - c - (((_ = n.value) == null ? void 0 : _.offsetWidth) || 0)
            };
            i(), window.addEventListener("resize", i, !1), window.addEventListener("orientationchange", i, !1)
        });

        function l(u, c) {
            var d, p, w;
            const i = (w = (p = (d = u == null ? void 0 : u.ownerDocument) == null ? void 0 : d.defaultView) == null ? void 0 : p.getComputedStyle(u, null)) == null ? void 0 : w[c],
                _ = Number.parseInt(i, 10);
            return Number.isNaN(_) ? 0 : _
        }

        return (u, c) => {
            const i = resolveComponent("NavbarSearch");
            return openBlock(), createElementBlock("header", {
                ref_key: "navbar",
                ref: r,
                class: "navbar"
            }, [createVNode(ToggleSidebarButton, {onToggle: c[0] || (c[0] = _ => u.$emit("toggle-sidebar"))}), createBaseVNode("span", {
                ref_key: "navbarBrand",
                ref: n
            }, [createVNode(NavbarBrand)], 512), createBaseVNode("div", {
                class: "navbar-items-wrapper",
                style: normalizeStyle(a.value)
            }, [renderSlot(u.$slots, "before"), createVNode(NavbarItems, {class: "can-hide"}), renderSlot(u.$slots, "after"), unref(t).colorModeSwitch ? (openBlock(), createBlock(ToggleColorModeButton, {key: 0})) : createCommentVNode("", !0), createVNode(i)], 4)], 512)
        }
    }
});
var Navbar = _export_sfc$1(_sfc_main$e, [["__file", "Navbar.vue"]]);
const _hoisted_1$b = {class: "page-meta"}, _hoisted_2$a = {key: 0, class: "meta-item edit-link"},
    _hoisted_3$7 = {key: 1, class: "meta-item last-updated"}, _hoisted_4$7 = {class: "meta-item-label"},
    _hoisted_5$6 = {class: "meta-item-info"}, _hoisted_6$6 = {key: 2, class: "meta-item contributors"},
    _hoisted_7$3 = {class: "meta-item-label"}, _hoisted_8$2 = {class: "meta-item-info"}, _hoisted_9$2 = ["title"],
    _sfc_main$d = defineComponent({
        __name: "PageMeta", setup(e) {
            const t = () => {
                const c = useThemeLocaleData(), i = usePageData(), _ = usePageFrontmatter();
                return computed(() => {
                    var k, R, L;
                    if (!((R = (k = _.value.editLink) != null ? k : c.value.editLink) != null ? R : !0)) return null;
                    const {
                        repo: p,
                        docsRepo: w = p,
                        docsBranch: B = "main",
                        docsDir: y = "",
                        editLinkText: v
                    } = c.value;
                    if (!w) return null;
                    const E = resolveEditLink({
                        docsRepo: w,
                        docsBranch: B,
                        docsDir: y,
                        filePathRelative: i.value.filePathRelative,
                        editLinkPattern: (L = _.value.editLinkPattern) != null ? L : c.value.editLinkPattern
                    });
                    return E ? {text: v != null ? v : "Edit this page", link: E} : null
                })
            }, r = () => {
                const c = useThemeLocaleData(), i = usePageData(), _ = usePageFrontmatter();
                return computed(() => {
                    var w, B, y, v;
                    return !((B = (w = _.value.lastUpdated) != null ? w : c.value.lastUpdated) != null ? B : !0) || !((y = i.value.git) != null && y.updatedTime) ? null : new Date((v = i.value.git) == null ? void 0 : v.updatedTime).toLocaleString()
                })
            }, n = () => {
                const c = useThemeLocaleData(), i = usePageData(), _ = usePageFrontmatter();
                return computed(() => {
                    var p, w, B, y;
                    return ((w = (p = _.value.contributors) != null ? p : c.value.contributors) != null ? w : !0) && (y = (B = i.value.git) == null ? void 0 : B.contributors) != null ? y : null
                })
            }, o = useThemeLocaleData(), a = t(), l = r(), u = n();
            return (c, i) => {
                const _ = resolveComponent("ClientOnly");
                return openBlock(), createElementBlock("footer", _hoisted_1$b, [unref(a) ? (openBlock(), createElementBlock("div", _hoisted_2$a, [createVNode(AutoLink, {
                    class: "meta-item-label",
                    item: unref(a)
                }, null, 8, ["item"])])) : createCommentVNode("", !0), unref(l) ? (openBlock(), createElementBlock("div", _hoisted_3$7, [createBaseVNode("span", _hoisted_4$7, toDisplayString(unref(o).lastUpdatedText) + ": ", 1), createVNode(_, null, {
                    default: withCtx(() => [createBaseVNode("span", _hoisted_5$6, toDisplayString(unref(l)), 1)]),
                    _: 1
                })])) : createCommentVNode("", !0), unref(u) && unref(u).length ? (openBlock(), createElementBlock("div", _hoisted_6$6, [createBaseVNode("span", _hoisted_7$3, toDisplayString(unref(o).contributorsText) + ": ", 1), createBaseVNode("span", _hoisted_8$2, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(u), (d, p) => (openBlock(), createElementBlock(Fragment, {key: p}, [createBaseVNode("span", {
                    class: "contributor",
                    title: `email: ${d.email}`
                }, toDisplayString(d.name), 9, _hoisted_9$2), p !== unref(u).length - 1 ? (openBlock(), createElementBlock(Fragment, {key: 0}, [createTextVNode(", ")], 64)) : createCommentVNode("", !0)], 64))), 128))])])) : createCommentVNode("", !0)])
            }
        }
    });
var PageMeta = _export_sfc$1(_sfc_main$d, [["__file", "PageMeta.vue"]]);
const _hoisted_1$a = {key: 0, class: "page-nav"}, _hoisted_2$9 = {class: "inner"},
    _hoisted_3$6 = {key: 0, class: "prev"}, _hoisted_4$6 = {key: 1, class: "next"}, _sfc_main$c = defineComponent({
        __name: "PageNav", setup(e) {
            const t = c => c === !1 ? null : isString(c) ? useNavLink(c) : isPlainObject(c) ? c : !1, r = (c, i, _) => {
                const d = c.findIndex(p => p.link === i);
                if (d !== -1) {
                    const p = c[d + _];
                    return p != null && p.link ? p : null
                }
                for (const p of c) if (p.children) {
                    const w = r(p.children, i, _);
                    if (w) return w
                }
                return null
            }, n = usePageFrontmatter(), o = useSidebarItems(), a = useRoute(), l = computed(() => {
                const c = t(n.value.prev);
                return c !== !1 ? c : r(o.value, a.path, -1)
            }), u = computed(() => {
                const c = t(n.value.next);
                return c !== !1 ? c : r(o.value, a.path, 1)
            });
            return (c, i) => l.value || u.value ? (openBlock(), createElementBlock("nav", _hoisted_1$a, [createBaseVNode("p", _hoisted_2$9, [l.value ? (openBlock(), createElementBlock("span", _hoisted_3$6, [createVNode(AutoLink, {item: l.value}, null, 8, ["item"])])) : createCommentVNode("", !0), u.value ? (openBlock(), createElementBlock("span", _hoisted_4$6, [createVNode(AutoLink, {item: u.value}, null, 8, ["item"])])) : createCommentVNode("", !0)])])) : createCommentVNode("", !0)
        }
    });
var PageNav = _export_sfc$1(_sfc_main$c, [["__file", "PageNav.vue"]]);
const _hoisted_1$9 = {class: "page"}, _hoisted_2$8 = {class: "theme-default-content"}, _sfc_main$b = defineComponent({
    __name: "Page", setup(e) {
        return (t, r) => {
            const n = resolveComponent("Content");
            return openBlock(), createElementBlock("main", _hoisted_1$9, [renderSlot(t.$slots, "top"), createBaseVNode("div", _hoisted_2$8, [renderSlot(t.$slots, "content-top"), createVNode(n), renderSlot(t.$slots, "content-bottom")]), createVNode(PageMeta), createVNode(PageNav), renderSlot(t.$slots, "bottom")])
        }
    }
});
var Page = _export_sfc$1(_sfc_main$b, [["__file", "Page.vue"]]);
const _hoisted_1$8 = ["onKeydown"], _hoisted_2$7 = {class: "sidebar-item-children"}, _sfc_main$a = defineComponent({
    __name: "SidebarItem",
    props: {item: {type: Object, required: !0}, depth: {type: Number, required: !1, default: 0}},
    setup(e) {
        const t = e, {item: r, depth: n} = toRefs(t), o = useRoute(), a = useRouter(),
            l = computed(() => isActiveSidebarItem(r.value, o)), u = computed(() => ({
                "sidebar-item": !0,
                "sidebar-heading": n.value === 0,
                active: l.value,
                collapsible: r.value.collapsible
            })), [c, i] = useToggle(l.value), _ = p => {
                r.value.collapsible && (p.preventDefault(), i())
            }, d = a.afterEach(p => {
                nextTick(() => {
                    c.value = r.value.collapsible ? l.value : !0
                })
            });
        return onBeforeUnmount(() => {
            d()
        }), (p, w) => {
            var y;
            const B = resolveComponent("SidebarItem", !0);
            return openBlock(), createElementBlock("li", null, [unref(r).link ? (openBlock(), createBlock(AutoLink, {
                key: 0,
                class: normalizeClass(u.value),
                item: unref(r)
            }, null, 8, ["class", "item"])) : (openBlock(), createElementBlock("p", {
                key: 1,
                tabindex: "0",
                class: normalizeClass(u.value),
                onClick: _,
                onKeydown: withKeys(_, ["enter"])
            }, [createTextVNode(toDisplayString(unref(r).text) + " ", 1), unref(r).collapsible ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(["arrow", unref(c) ? "down" : "right"])
            }, null, 2)) : createCommentVNode("", !0)], 42, _hoisted_1$8)), (y = unref(r).children) != null && y.length ? (openBlock(), createBlock(DropdownTransition, {key: 2}, {
                default: withCtx(() => [withDirectives(createBaseVNode("ul", _hoisted_2$7, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(r).children, v => (openBlock(), createBlock(B, {
                    key: `${unref(n)}${v.text}${v.link}`,
                    item: v,
                    depth: unref(n) + 1
                }, null, 8, ["item", "depth"]))), 128))], 512), [[vShow, unref(c)]])]), _: 1
            })) : createCommentVNode("", !0)])
        }
    }
});
var SidebarItem = _export_sfc$1(_sfc_main$a, [["__file", "SidebarItem.vue"]]);
const _hoisted_1$7 = {key: 0, class: "sidebar-items"}, _sfc_main$9 = defineComponent({
    __name: "SidebarItems", setup(e) {
        const t = useRoute(), r = useSidebarItems();
        return onMounted(() => {
            watch(() => t.hash, n => {
                const o = document.querySelector(".sidebar");
                if (!o) return;
                const a = document.querySelector(`.sidebar a.sidebar-item[href="${t.path}${n}"]`);
                if (!a) return;
                const {top: l, height: u} = o.getBoundingClientRect(), {top: c, height: i} = a.getBoundingClientRect();
                c < l ? a.scrollIntoView(!0) : c + i > l + u && a.scrollIntoView(!1)
            })
        }), (n, o) => unref(r).length ? (openBlock(), createElementBlock("ul", _hoisted_1$7, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(r), a => (openBlock(), createBlock(SidebarItem, {
            key: `${a.text}${a.link}`,
            item: a
        }, null, 8, ["item"]))), 128))])) : createCommentVNode("", !0)
    }
});
var SidebarItems = _export_sfc$1(_sfc_main$9, [["__file", "SidebarItems.vue"]]),
    sidebar_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = e => (pushScopeId("data-v-db8971c4"), e = e(), popScopeId(), e),
    _hoisted_1$6 = {class: "sidebar"}, _hoisted_2$6 = {class: "sidebar-container"},
    _hoisted_3$5 = {class: "sidebar-bottom"},
    _hoisted_4$5 = _withScopeId$3(() => createBaseVNode("li", {class: "sidebar-item sidebar-heading appearance"}, [createTextVNode(" Github "), createBaseVNode("a", {
        class: "icon",
        href: "https://github.com/Akegarasu/lora-scripts",
        target: "_blank",
        "aria-label": "GitHub"
    }, [createBaseVNode("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 24 24"
    }, [createBaseVNode("path", {
        d: "M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z",
        fill: "currentColor"
    })])])], -1)), _hoisted_5$5 = _withScopeId$3(() => createBaseVNode("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24"
    }, [createBaseVNode("path", {
        d: " M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",
        fill: "currentColor"
    })], -1)), _hoisted_6$5 = [_hoisted_5$5], _hoisted_7$2 = {class: "sidebar-item sidebar-heading appearance"},
    _sfc_main$8 = defineComponent({
        __name: "sidebar", setup(e) {
            const t = () => {
                window.i18n.global.locale.value = window.i18n.global.locale.value === "en-US" ? "zh-CN" : "en-US", ElMessage.success("Switch language success")
            };
            return (r, n) => {
                const o = resolveComponent("el-scrollbar");
                return openBlock(), createElementBlock("aside", _hoisted_1$6, [createVNode(o, null, {
                    default: withCtx(() => [createBaseVNode("div", _hoisted_2$6, [createVNode(NavbarItems), createVNode(SidebarItems), createBaseVNode("ul", _hoisted_3$5, [_hoisted_4$5, createBaseVNode("li", {class: "sidebar-item sidebar-heading appearance"}, [createTextVNode(" Language "), createBaseVNode("button", {
                        class: "toggle-color-mode-button",
                        onClick: t
                    }, _hoisted_6$5)]), createBaseVNode("li", _hoisted_7$2, [createTextVNode(" \u706F\u6CE1 "), createVNode(ToggleColorModeButton)])])])]),
                    _: 1
                })])
            }
        }
    });
var Sidebar = _export_sfc$1(_sfc_main$8, [["__scopeId", "data-v-db8971c4"], ["__file", "sidebar.vue"]]);
const _sfc_main$7 = defineComponent({
    __name: "Layout", setup(e) {
        const t = usePageData(), r = usePageFrontmatter(), n = useThemeLocaleData(),
            o = computed(() => r.value.navbar !== !1 && n.value.navbar !== !1), a = useSidebarItems(), l = ref(!1),
            u = v => {
                l.value = typeof v == "boolean" ? v : !l.value
            }, c = {x: 0, y: 0}, i = v => {
                c.x = v.changedTouches[0].clientX, c.y = v.changedTouches[0].clientY
            }, _ = v => {
                const E = v.changedTouches[0].clientX - c.x, k = v.changedTouches[0].clientY - c.y;
                Math.abs(E) > Math.abs(k) && Math.abs(E) > 40 && (E > 0 && c.x <= 80 ? u(!0) : u(!1))
            }, d = computed(() => [{
                "no-navbar": !o.value,
                "no-sidebar": !a.value.length,
                "sidebar-open": l.value
            }, r.value.pageClass]);
        let p;
        onMounted(() => {
            p = useRouter().afterEach(() => {
                u(!1)
            })
        }), onUnmounted(() => {
            p()
        });
        const w = useScrollPromise(), B = w.resolve, y = w.pending;
        return (v, E) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["theme-container", d.value]),
            onTouchstart: i,
            onTouchend: _
        }, [renderSlot(v.$slots, "navbar", {}, () => [o.value ? (openBlock(), createBlock(Navbar, {
            key: 0,
            onToggleSidebar: u
        }, {
            before: withCtx(() => [renderSlot(v.$slots, "navbar-before")]),
            after: withCtx(() => [renderSlot(v.$slots, "navbar-after")]),
            _: 3
        })) : createCommentVNode("", !0)]), createBaseVNode("div", {
            class: "sidebar-mask",
            onClick: E[0] || (E[0] = k => u(!1))
        }), renderSlot(v.$slots, "sidebar", {}, () => [createVNode(Sidebar, null, {
            top: withCtx(() => [renderSlot(v.$slots, "sidebar-top")]),
            bottom: withCtx(() => [renderSlot(v.$slots, "sidebar-bottom")]),
            _: 3
        })]), renderSlot(v.$slots, "page", {}, () => [unref(r).home ? (openBlock(), createBlock(Home, {key: 0})) : (openBlock(), createBlock(Transition, {
            key: 1,
            name: "fade-slide-y",
            mode: "out-in",
            onBeforeEnter: unref(B),
            onBeforeLeave: unref(y)
        }, {
            default: withCtx(() => [(openBlock(), createBlock(Page, {key: unref(t).path}, {
                top: withCtx(() => [renderSlot(v.$slots, "page-top")]),
                "content-top": withCtx(() => [renderSlot(v.$slots, "page-content-top")]),
                "content-bottom": withCtx(() => [renderSlot(v.$slots, "page-content-bottom")]),
                bottom: withCtx(() => [renderSlot(v.$slots, "page-bottom")]),
                _: 3
            }))]), _: 3
        }, 8, ["onBeforeEnter", "onBeforeLeave"]))])], 34))
    }
});
var ParentLayout = _export_sfc$1(_sfc_main$7, [["__file", "Layout.vue"]]);

function stringify(e) {
    if (e === null) throw typeError("null");
    if (e === void 0) throw typeError("undefined");
    if (typeof e != "object") throw typeError(typeof e);
    if (typeof e.toJSON == "function" && (e = e.toJSON()), e == null) return null;
    const t = tomlType$1(e);
    if (t !== "table") throw typeError(t);
    return stringifyObject("", "", e)
}

function typeError(e) {
    return new Error("Can only stringify objects, not " + e)
}

function arrayOneTypeError() {
    return new Error("Array values can't have mixed types")
}

function getInlineKeys(e) {
    return Object.keys(e).filter(t => isInline(e[t]))
}

function getComplexKeys(e) {
    return Object.keys(e).filter(t => !isInline(e[t]))
}

function toJSON(e) {
    let t = Array.isArray(e) ? [] : Object.prototype.hasOwnProperty.call(e, "__proto__") ? {["__proto__"]: void 0} : {};
    for (let r of Object.keys(e)) e[r] && typeof e[r].toJSON == "function" && !("toISOString" in e[r]) ? t[r] = e[r].toJSON() : t[r] = e[r];
    return t
}

function stringifyObject(e, t, r) {
    r = toJSON(r);
    var n, o;
    n = getInlineKeys(r), o = getComplexKeys(r);
    var a = [], l = t || "";
    n.forEach(c => {
        var i = tomlType$1(r[c]);
        i !== "undefined" && i !== "null" && a.push(l + stringifyKey(c) + " = " + stringifyAnyInline(r[c], !0))
    }), a.length > 0 && a.push("");
    var u = e && n.length > 0 ? t + "  " : "";
    return o.forEach(c => {
        a.push(stringifyComplex(e, u, c, r[c]))
    }), a.join(`
`)
}

function isInline(e) {
    switch (tomlType$1(e)) {
        case"undefined":
        case"null":
        case"integer":
        case"nan":
        case"float":
        case"boolean":
        case"string":
        case"datetime":
            return !0;
        case"array":
            return e.length === 0 || tomlType$1(e[0]) !== "table";
        case"table":
            return Object.keys(e).length === 0;
        default:
            return !1
    }
}

function tomlType$1(e) {
    return e === void 0 ? "undefined" : e === null ? "null" : typeof e == "bigint" || Number.isInteger(e) && !Object.is(e, -0) ? "integer" : typeof e == "number" ? "float" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : "toISOString" in e ? isNaN(e) ? "undefined" : "datetime" : Array.isArray(e) ? "array" : "table"
}

function stringifyKey(e) {
    var t = String(e);
    return /^[-A-Za-z0-9_]+$/.test(t) ? t : stringifyBasicString(t)
}

function stringifyBasicString(e) {
    return '"' + escapeString(e).replace(/"/g, '\\"') + '"'
}

function stringifyLiteralString(e) {
    return "'" + e + "'"
}

function numpad(e, t) {
    for (; t.length < e;) t = "0" + t;
    return t
}

function escapeString(e) {
    return e.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/([\u0000-\u001f\u007f])/, t => "\\u" + numpad(4, t.codePointAt(0).toString(16)))
}

function stringifyMultilineString(e) {
    let t = e.split(/\n/).map(r => escapeString(r).replace(/"(?="")/g, '\\"')).join(`
`);
    return t.slice(-1) === '"' && (t += `\\
`), `"""
` + t + '"""'
}

function stringifyAnyInline(e, t) {
    let r = tomlType$1(e);
    return r === "string" && (t && /\n/.test(e) ? r = "string-multiline" : !/[\b\t\n\f\r']/.test(e) && /"/.test(e) && (r = "string-literal")), stringifyInline(e, r)
}

function stringifyInline(e, t) {
    switch (t || (t = tomlType$1(e)), t) {
        case"string-multiline":
            return stringifyMultilineString(e);
        case"string":
            return stringifyBasicString(e);
        case"string-literal":
            return stringifyLiteralString(e);
        case"integer":
            return stringifyInteger(e);
        case"float":
            return stringifyFloat(e);
        case"boolean":
            return stringifyBoolean(e);
        case"datetime":
            return stringifyDatetime(e);
        case"array":
            return stringifyInlineArray(e.filter(r => tomlType$1(r) !== "null" && tomlType$1(r) !== "undefined" && tomlType$1(r) !== "nan"));
        case"table":
            return stringifyInlineTable(e);
        default:
            throw typeError(t)
    }
}

function stringifyInteger(e) {
    return String(e)
}

function stringifyFloat(e) {
    if (e === 1 / 0) return "inf";
    if (e === -1 / 0) return "-inf";
    if (Object.is(e, NaN)) return "nan";
    if (Object.is(e, -0)) return "-0.0";
    var t = String(e).split("."), r = t[0];
    if (t.length == 1) return stringifyInteger(r);
    var n = t[1] || 0;
    return stringifyInteger(r) + "." + n
}

function stringifyBoolean(e) {
    return String(e)
}

function stringifyDatetime(e) {
    return e.toISOString()
}

function isNumber(e) {
    return e === "float" || e === "integer"
}

function arrayType(e) {
    var t = tomlType$1(e[0]);
    return e.every(r => tomlType$1(r) === t) ? t : e.every(r => isNumber(tomlType$1(r))) ? "float" : "mixed"
}

function validateArray(e) {
    const t = arrayType(e);
    if (t === "mixed") throw arrayOneTypeError();
    return t
}

function stringifyInlineArray(e) {
    e = toJSON(e);
    const t = validateArray(e);
    var r = "[", n = e.map(o => stringifyInline(o, t));
    return n.join(", ").length > 60 || /\n/.test(n) ? r += `
  ` + n.join(`,
  `) + `
` : r += " " + n.join(", ") + (n.length > 0 ? " " : ""), r + "]"
}

function stringifyInlineTable(e) {
    e = toJSON(e);
    var t = [];
    return Object.keys(e).forEach(r => {
        t.push(stringifyKey(r) + " = " + stringifyAnyInline(e[r], !1))
    }), "{ " + t.join(", ") + (t.length > 0 ? " " : "") + "}"
}

function stringifyComplex(e, t, r, n) {
    var o = tomlType$1(n);
    if (o === "array") return stringifyArrayOfTables(e, t, r, n);
    if (o === "table") return stringifyComplexTable(e, t, r, n);
    throw typeError(o)
}

function stringifyArrayOfTables(e, t, r, n) {
    n = toJSON(n), validateArray(n);
    var o = tomlType$1(n[0]);
    if (o !== "table") throw typeError(o);
    var a = e + stringifyKey(r), l = "";
    return n.forEach(u => {
        l.length > 0 && (l += `
`), l += t + "[[" + a + `]]
`, l += stringifyObject(a + ".", t, u)
    }), l
}

function stringifyComplexTable(e, t, r, n) {
    var o = e + stringifyKey(r), a = "";
    return getInlineKeys(n).length > 0 && (a += t + "[" + o + `]
`), a + stringifyObject(o + ".", t, n)
}

const ParserEND = 1114112;

class ParserError extends Error {
    constructor(t, r, n) {
        super("[ParserError] " + t, r, n), this.name = "ParserError", this.code = "ParserError", Error.captureStackTrace && Error.captureStackTrace(this, ParserError)
    }
}

class State {
    constructor(t) {
        this.parser = t, this.buf = "", this.returned = null, this.result = null, this.resultTable = null, this.resultArr = null
    }
}

class Parser {
    constructor() {
        this.pos = 0, this.col = 0, this.line = 0, this.obj = {}, this.ctx = this.obj, this.stack = [], this._buf = "", this.char = null, this.ii = 0, this.state = new State(this.parseStart)
    }

    parse(t) {
        if (t.length === 0 || t.length == null) return;
        this._buf = String(t), this.ii = -1, this.char = -1;
        let r;
        for (; r === !1 || this.nextChar();) r = this.runOne();
        this._buf = null
    }

    nextChar() {
        return this.char === 10 && (++this.line, this.col = -1), ++this.ii, this.char = this._buf.codePointAt(this.ii), ++this.pos, ++this.col, this.haveBuffer()
    }

    haveBuffer() {
        return this.ii < this._buf.length
    }

    runOne() {
        return this.state.parser.call(this, this.state.returned)
    }

    finish() {
        this.char = ParserEND;
        let t;
        do t = this.state.parser, this.runOne(); while (this.state.parser !== t);
        return this.ctx = null, this.state = null, this._buf = null, this.obj
    }

    next(t) {
        if (typeof t != "function") throw new ParserError("Tried to set state to non-existent state: " + JSON.stringify(t));
        this.state.parser = t
    }

    goto(t) {
        return this.next(t), this.runOne()
    }

    call(t, r) {
        r && this.next(r), this.stack.push(this.state), this.state = new State(t)
    }

    callNow(t, r) {
        return this.call(t, r), this.runOne()
    }

    return(t) {
        if (this.stack.length === 0) throw this.error(new ParserError("Stack underflow"));
        t === void 0 && (t = this.state.buf), this.state = this.stack.pop(), this.state.returned = t
    }

    returnNow(t) {
        return this.return(t), this.runOne()
    }

    consume() {
        if (this.char === ParserEND) throw this.error(new ParserError("Unexpected end-of-buffer"));
        this.state.buf += this._buf[this.ii]
    }

    error(t) {
        return t.line = this.line, t.col = this.col, t.pos = this.pos, t
    }

    parseStart() {
        throw new ParserError("Must declare a parseStart method")
    }
}

Parser.END = ParserEND;
Parser.Error = ParserError;
const f = (e, t) => {
    for (t = String(t); t.length < e;) t = "0" + t;
    return t
}, DateTime = globalThis.Date;

class Date$1 extends DateTime {
    constructor(t) {
        super(t), this.isDate = !0
    }

    toISOString() {
        return `${this.getUTCFullYear()}-${f(2, this.getUTCMonth() + 1)}-${f(2, this.getUTCDate())}`
    }
}

const createDate = e => {
    const t = new Date$1(e);
    if (isNaN(t)) throw new TypeError("Invalid Datetime");
    return t
};

class FloatingDateTime extends Date$1 {
    constructor(t) {
        super(t + "Z"), this.isFloating = !0
    }

    toISOString() {
        const t = `${this.getUTCFullYear()}-${f(2, this.getUTCMonth() + 1)}-${f(2, this.getUTCDate())}`,
            r = `${f(2, this.getUTCHours())}:${f(2, this.getUTCMinutes())}:${f(2, this.getUTCSeconds())}.${f(3, this.getUTCMilliseconds())}`;
        return `${t}T${r}`
    }
}

const createDateTime = e => {
    const t = new Date$1(e);
    if (isNaN(t)) throw new TypeError("Invalid Datetime");
    return t
}, createDateTimeFloat = e => {
    const t = new FloatingDateTime(e);
    if (isNaN(t)) throw new TypeError("Invalid Datetime");
    return t
};

class Time extends Date$1 {
    constructor(t) {
        super(`0000-01-01T${t}Z`), this.isTime = !0
    }

    toISOString() {
        return `${f(2, this.getUTCHours())}:${f(2, this.getUTCMinutes())}:${f(2, this.getUTCSeconds())}.${f(3, this.getUTCMilliseconds())}`
    }
}

const createTime = e => {
    const t = new Time(e);
    if (isNaN(t)) throw new TypeError("Invalid Datetime");
    return t
}, parserClass = makeParserClass(Parser);

class TomlError extends Error {
    constructor(t) {
        super(t), this.name = "TomlError", Error.captureStackTrace && Error.captureStackTrace(this, TomlError), this.fromTOML = !0, this.wrapped = null
    }
}

TomlError.wrap = e => {
    const t = new TomlError(e.message);
    return t.code = e.code, t.wrapped = e, t
};
const CTRL_I = 9, CTRL_J = 10, CTRL_M = 13, CTRL_CHAR_BOUNDARY = 31, CHAR_SP = 32, CHAR_QUOT = 34, CHAR_NUM = 35,
    CHAR_APOS = 39, CHAR_PLUS = 43, CHAR_COMMA = 44, CHAR_HYPHEN = 45, CHAR_PERIOD = 46, CHAR_0 = 48, CHAR_1 = 49,
    CHAR_7 = 55, CHAR_9 = 57, CHAR_COLON = 58, CHAR_EQUALS = 61, CHAR_A = 65, CHAR_E = 69, CHAR_F = 70, CHAR_T = 84,
    CHAR_U = 85, CHAR_Z = 90, CHAR_LOWBAR = 95, CHAR_a = 97, CHAR_b = 98, CHAR_e = 101, CHAR_f = 102, CHAR_i = 105,
    CHAR_l = 108, CHAR_n = 110, CHAR_o = 111, CHAR_r = 114, CHAR_s = 115, CHAR_t = 116, CHAR_u = 117, CHAR_x = 120,
    CHAR_z = 122, CHAR_LCUB = 123, CHAR_RCUB = 125, CHAR_LSQB = 91, CHAR_BSOL = 92, CHAR_RSQB = 93, CHAR_DEL = 127,
    SURROGATE_FIRST = 55296, SURROGATE_LAST = 57343, escapes = {
        [CHAR_b]: "\b", [CHAR_t]: "	", [CHAR_n]: `
`, [CHAR_f]: "\f", [CHAR_r]: "\r", [CHAR_QUOT]: '"', [CHAR_BSOL]: "\\"
    };

function isDigit(e) {
    return e >= CHAR_0 && e <= CHAR_9
}

function isHexit(e) {
    return e >= CHAR_A && e <= CHAR_F || e >= CHAR_a && e <= CHAR_f || e >= CHAR_0 && e <= CHAR_9
}

function isBit(e) {
    return e === CHAR_1 || e === CHAR_0
}

function isOctit(e) {
    return e >= CHAR_0 && e <= CHAR_7
}

function isAlphaNumQuoteHyphen(e) {
    return e >= CHAR_A && e <= CHAR_Z || e >= CHAR_a && e <= CHAR_z || e >= CHAR_0 && e <= CHAR_9 || e === CHAR_APOS || e === CHAR_QUOT || e === CHAR_LOWBAR || e === CHAR_HYPHEN
}

function isAlphaNumHyphen(e) {
    return e >= CHAR_A && e <= CHAR_Z || e >= CHAR_a && e <= CHAR_z || e >= CHAR_0 && e <= CHAR_9 || e === CHAR_LOWBAR || e === CHAR_HYPHEN
}

const _type = Symbol("type"), _declared = Symbol("declared"), hasOwnProperty = Object.prototype.hasOwnProperty,
    defineProperty = Object.defineProperty,
    descriptor = {configurable: !0, enumerable: !0, writable: !0, value: void 0};

function hasKey(e, t) {
    return hasOwnProperty.call(e, t) ? !0 : (t === "__proto__" && defineProperty(e, "__proto__", descriptor), !1)
}

const INLINE_TABLE = Symbol("inline-table");

function InlineTable() {
    return Object.defineProperties({}, {[_type]: {value: INLINE_TABLE}})
}

function isInlineTable(e) {
    return e === null || typeof e != "object" ? !1 : e[_type] === INLINE_TABLE
}

const TABLE = Symbol("table");

function Table() {
    return Object.defineProperties({}, {[_type]: {value: TABLE}, [_declared]: {value: !1, writable: !0}})
}

function isTable(e) {
    return e === null || typeof e != "object" ? !1 : e[_type] === TABLE
}

const _contentType = Symbol("content-type"), INLINE_LIST = Symbol("inline-list");

function InlineList(e) {
    return Object.defineProperties([], {[_type]: {value: INLINE_LIST}, [_contentType]: {value: e}})
}

function isInlineList(e) {
    return e === null || typeof e != "object" ? !1 : e[_type] === INLINE_LIST
}

const LIST = Symbol("list");

function List() {
    return Object.defineProperties([], {[_type]: {value: LIST}})
}

function isList(e) {
    return e === null || typeof e != "object" ? !1 : e[_type] === LIST
}

let _custom;
try {
    const utilInspect = eval("require('util').inspect");
    _custom = utilInspect.custom
} catch (e) {
}
const _inspect = _custom || "inspect";

class BoxedBigInt {
    constructor(t) {
        try {
            this.value = globalThis.BigInt.asIntN(64, t)
        } catch {
            this.value = null
        }
        Object.defineProperty(this, _type, {value: INTEGER})
    }

    isNaN() {
        return this.value === null
    }

    toString() {
        return String(this.value)
    }

    [_inspect]() {
        return `[BigInt: ${this.toString()}]}`
    }

    valueOf() {
        return this.value
    }
}

const INTEGER = Symbol("integer");

function Integer(e) {
    let t = Number(e);
    return Object.is(t, -0) && (t = 0), globalThis.BigInt && !Number.isSafeInteger(t) ? new BoxedBigInt(e) : Object.defineProperties(new Number(t), {
        isNaN: {
            value: function () {
                return isNaN(this)
            }
        }, [_type]: {value: INTEGER}, [_inspect]: {value: () => `[Integer: ${e}]`}
    })
}

function isInteger(e) {
    return e === null || typeof e != "object" ? !1 : e[_type] === INTEGER
}

const FLOAT = Symbol("float");

function Float(e) {
    return Object.defineProperties(new Number(e), {[_type]: {value: FLOAT}, [_inspect]: {value: () => `[Float: ${e}]`}})
}

function isFloat(e) {
    return e === null || typeof e != "object" ? !1 : e[_type] === FLOAT
}

function tomlType(e) {
    const t = typeof e;
    if (t === "object") {
        if (e === null) return "null";
        if (e instanceof Date) return "datetime";
        if (_type in e) switch (e[_type]) {
            case INLINE_TABLE:
                return "inline-table";
            case INLINE_LIST:
                return "inline-list";
            case TABLE:
                return "table";
            case LIST:
                return "list";
            case FLOAT:
                return "float";
            case INTEGER:
                return "integer"
        }
    }
    return t
}

function makeParserClass(e) {
    class t extends e {
        constructor() {
            super(), this.ctx = this.obj = Table()
        }

        atEndOfWord() {
            return this.char === CHAR_NUM || this.char === CTRL_I || this.char === CHAR_SP || this.atEndOfLine()
        }

        atEndOfLine() {
            return this.char === e.END || this.char === CTRL_J || this.char === CTRL_M
        }

        parseStart() {
            if (this.char === e.END) return null;
            if (this.char === CHAR_LSQB) return this.call(this.parseTableOrList);
            if (this.char === CHAR_NUM) return this.call(this.parseComment);
            if (this.char === CTRL_J || this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M) return null;
            if (isAlphaNumQuoteHyphen(this.char)) return this.callNow(this.parseAssignStatement);
            throw this.error(new TomlError(`Unknown character "${this.char}"`))
        }

        parseWhitespaceToEOL() {
            if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M) return null;
            if (this.char === CHAR_NUM) return this.goto(this.parseComment);
            if (this.char === e.END || this.char === CTRL_J) return this.return();
            throw this.error(new TomlError("Unexpected character, expected only whitespace or comments till end of line"))
        }

        parseAssignStatement() {
            return this.callNow(this.parseAssign, this.recordAssignStatement)
        }

        recordAssignStatement(n) {
            let o = this.ctx, a = n.key.pop();
            for (let l of n.key) {
                if (hasKey(o, l) && !isTable(o[l])) throw this.error(new TomlError("Can't redefine existing key"));
                o = o[l] = o[l] || Table()
            }
            if (hasKey(o, a)) throw this.error(new TomlError("Can't redefine existing key"));
            return o[_declared] = !0, isInteger(n.value) || isFloat(n.value) ? o[a] = n.value.valueOf() : o[a] = n.value, this.goto(this.parseWhitespaceToEOL)
        }

        parseAssign() {
            return this.callNow(this.parseKeyword, this.recordAssignKeyword)
        }

        recordAssignKeyword(n) {
            return this.state.resultTable ? this.state.resultTable.push(n) : this.state.resultTable = [n], this.goto(this.parseAssignKeywordPreDot)
        }

        parseAssignKeywordPreDot() {
            if (this.char === CHAR_PERIOD) return this.next(this.parseAssignKeywordPostDot);
            if (this.char !== CHAR_SP && this.char !== CTRL_I) return this.goto(this.parseAssignEqual)
        }

        parseAssignKeywordPostDot() {
            if (this.char !== CHAR_SP && this.char !== CTRL_I) return this.callNow(this.parseKeyword, this.recordAssignKeyword)
        }

        parseAssignEqual() {
            if (this.char === CHAR_EQUALS) return this.next(this.parseAssignPreValue);
            throw this.error(new TomlError('Invalid character, expected "="'))
        }

        parseAssignPreValue() {
            return this.char === CHAR_SP || this.char === CTRL_I ? null : this.callNow(this.parseValue, this.recordAssignValue)
        }

        recordAssignValue(n) {
            return this.returnNow({key: this.state.resultTable, value: n})
        }

        parseComment() {
            do {
                if (this.char === e.END || this.char === CTRL_J) return this.return();
                if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I) throw this.errorControlCharIn("comments")
            } while (this.nextChar())
        }

        parseTableOrList() {
            if (this.char === CHAR_LSQB) this.next(this.parseList); else return this.goto(this.parseTable)
        }

        parseTable() {
            return this.ctx = this.obj, this.goto(this.parseTableNext)
        }

        parseTableNext() {
            return this.char === CHAR_SP || this.char === CTRL_I ? null : this.callNow(this.parseKeyword, this.parseTableMore)
        }

        parseTableMore(n) {
            if (this.char === CHAR_SP || this.char === CTRL_I) return null;
            if (this.char === CHAR_RSQB) {
                if (hasKey(this.ctx, n) && (!isTable(this.ctx[n]) || this.ctx[n][_declared])) throw this.error(new TomlError("Can't redefine existing key"));
                return this.ctx = this.ctx[n] = this.ctx[n] || Table(), this.ctx[_declared] = !0, this.next(this.parseWhitespaceToEOL)
            } else if (this.char === CHAR_PERIOD) {
                if (!hasKey(this.ctx, n)) this.ctx = this.ctx[n] = Table(); else if (isTable(this.ctx[n])) this.ctx = this.ctx[n]; else if (isList(this.ctx[n])) this.ctx = this.ctx[n][this.ctx[n].length - 1]; else throw this.error(new TomlError("Can't redefine existing key"));
                return this.next(this.parseTableNext)
            } else throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"))
        }

        parseList() {
            return this.ctx = this.obj, this.goto(this.parseListNext)
        }

        parseListNext() {
            return this.char === CHAR_SP || this.char === CTRL_I ? null : this.callNow(this.parseKeyword, this.parseListMore)
        }

        parseListMore(n) {
            if (this.char === CHAR_SP || this.char === CTRL_I) return null;
            if (this.char === CHAR_RSQB) {
                if (hasKey(this.ctx, n) || (this.ctx[n] = List()), isInlineList(this.ctx[n])) throw this.error(new TomlError("Can't extend an inline array"));
                if (isList(this.ctx[n])) {
                    const o = Table();
                    this.ctx[n].push(o), this.ctx = o
                } else throw this.error(new TomlError("Can't redefine an existing key"));
                return this.next(this.parseListEnd)
            } else if (this.char === CHAR_PERIOD) {
                if (!hasKey(this.ctx, n)) this.ctx = this.ctx[n] = Table(); else {
                    if (isInlineList(this.ctx[n])) throw this.error(new TomlError("Can't extend an inline array"));
                    if (isInlineTable(this.ctx[n])) throw this.error(new TomlError("Can't extend an inline table"));
                    if (isList(this.ctx[n])) this.ctx = this.ctx[n][this.ctx[n].length - 1]; else if (isTable(this.ctx[n])) this.ctx = this.ctx[n]; else throw this.error(new TomlError("Can't redefine an existing key"))
                }
                return this.next(this.parseListNext)
            } else throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"))
        }

        parseListEnd(n) {
            if (this.char === CHAR_RSQB) return this.next(this.parseWhitespaceToEOL);
            throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"))
        }

        parseValue() {
            if (this.char === e.END) throw this.error(new TomlError("Key without value"));
            if (this.char === CHAR_QUOT) return this.next(this.parseDoubleString);
            if (this.char === CHAR_APOS) return this.next(this.parseSingleString);
            if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) return this.goto(this.parseNumberSign);
            if (this.char === CHAR_i) return this.next(this.parseInf);
            if (this.char === CHAR_n) return this.next(this.parseNan);
            if (isDigit(this.char)) return this.goto(this.parseNumberOrDateTime);
            if (this.char === CHAR_t || this.char === CHAR_f) return this.goto(this.parseBoolean);
            if (this.char === CHAR_LSQB) return this.call(this.parseInlineList, this.recordValue);
            if (this.char === CHAR_LCUB) return this.call(this.parseInlineTable, this.recordValue);
            throw this.error(new TomlError("Unexpected character, expecting string, number, datetime, boolean, inline array or inline table"))
        }

        recordValue(n) {
            return this.returnNow(n)
        }

        parseInf() {
            if (this.char === CHAR_n) return this.next(this.parseInf2);
            throw this.error(new TomlError('Unexpected character, expected "inf", "+inf" or "-inf"'))
        }

        parseInf2() {
            if (this.char === CHAR_f) return this.state.buf === "-" ? this.return(-1 / 0) : this.return(1 / 0);
            throw this.error(new TomlError('Unexpected character, expected "inf", "+inf" or "-inf"'))
        }

        parseNan() {
            if (this.char === CHAR_a) return this.next(this.parseNan2);
            throw this.error(new TomlError('Unexpected character, expected "nan"'))
        }

        parseNan2() {
            if (this.char === CHAR_n) return this.return(NaN);
            throw this.error(new TomlError('Unexpected character, expected "nan"'))
        }

        parseKeyword() {
            return this.char === CHAR_QUOT ? this.next(this.parseBasicString) : this.char === CHAR_APOS ? this.next(this.parseLiteralString) : this.goto(this.parseBareKey)
        }

        parseBareKey() {
            do {
                if (this.char === e.END) throw this.error(new TomlError("Key ended without value"));
                if (isAlphaNumHyphen(this.char)) this.consume(); else {
                    if (this.state.buf.length === 0) throw this.error(new TomlError("Empty bare keys are not allowed"));
                    return this.returnNow()
                }
            } while (this.nextChar())
        }

        parseSingleString() {
            return this.char === CHAR_APOS ? this.next(this.parseLiteralMultiStringMaybe) : this.goto(this.parseLiteralString)
        }

        parseLiteralString() {
            do {
                if (this.char === CHAR_APOS) return this.return();
                if (this.atEndOfLine()) throw this.error(new TomlError("Unterminated string"));
                if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I) throw this.errorControlCharIn("strings");
                this.consume()
            } while (this.nextChar())
        }

        parseLiteralMultiStringMaybe() {
            return this.char === CHAR_APOS ? this.next(this.parseLiteralMultiString) : this.returnNow()
        }

        parseLiteralMultiString() {
            return this.char === CTRL_M ? null : this.char === CTRL_J ? this.next(this.parseLiteralMultiStringContent) : this.goto(this.parseLiteralMultiStringContent)
        }

        parseLiteralMultiStringContent() {
            do {
                if (this.char === CHAR_APOS) return this.next(this.parseLiteralMultiEnd);
                if (this.char === e.END) throw this.error(new TomlError("Unterminated multi-line string"));
                if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I && this.char !== CTRL_J && this.char !== CTRL_M) throw this.errorControlCharIn("strings");
                this.consume()
            } while (this.nextChar())
        }

        parseLiteralMultiEnd() {
            return this.char === CHAR_APOS ? this.next(this.parseLiteralMultiEnd2) : (this.state.buf += "'", this.goto(this.parseLiteralMultiStringContent))
        }

        parseLiteralMultiEnd2() {
            return this.char === CHAR_APOS ? this.next(this.parseLiteralMultiEnd3) : (this.state.buf += "''", this.goto(this.parseLiteralMultiStringContent))
        }

        parseLiteralMultiEnd3() {
            return this.char === CHAR_APOS ? (this.state.buf += "'", this.next(this.parseLiteralMultiEnd4)) : this.returnNow()
        }

        parseLiteralMultiEnd4() {
            return this.char === CHAR_APOS ? (this.state.buf += "'", this.return()) : this.returnNow()
        }

        parseDoubleString() {
            return this.char === CHAR_QUOT ? this.next(this.parseMultiStringMaybe) : this.goto(this.parseBasicString)
        }

        parseBasicString() {
            do {
                if (this.char === CHAR_BSOL) return this.call(this.parseEscape, this.recordEscapeReplacement);
                if (this.char === CHAR_QUOT) return this.return();
                if (this.atEndOfLine()) throw this.error(new TomlError("Unterminated string"));
                if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I) throw this.errorControlCharIn("strings");
                this.consume()
            } while (this.nextChar())
        }

        recordEscapeReplacement(n) {
            return this.state.buf += n, this.goto(this.parseBasicString)
        }

        parseMultiStringMaybe() {
            return this.char === CHAR_QUOT ? this.next(this.parseMultiString) : this.returnNow()
        }

        parseMultiString() {
            return this.char === CTRL_M ? null : this.char === CTRL_J ? this.next(this.parseMultiStringContent) : this.goto(this.parseMultiStringContent)
        }

        parseMultiStringContent() {
            do {
                if (this.char === CHAR_BSOL) return this.call(this.parseMultiEscape, this.recordMultiEscapeReplacement);
                if (this.char === CHAR_QUOT) return this.next(this.parseMultiEnd);
                if (this.char === e.END) throw this.error(new TomlError("Unterminated multi-line string"));
                if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I && this.char !== CTRL_J && this.char !== CTRL_M) throw this.errorControlCharIn("strings");
                this.consume()
            } while (this.nextChar())
        }

        errorControlCharIn(n) {
            let o = "\\u00";
            return this.char < 16 && (o += "0"), o += this.char.toString(16), this.error(new TomlError(`Control characters (codes < 0x1f and 0x7f) are not allowed in ${n}, use ${o} instead`))
        }

        recordMultiEscapeReplacement(n) {
            return this.state.buf += n, this.goto(this.parseMultiStringContent)
        }

        parseMultiEnd() {
            return this.char === CHAR_QUOT ? this.next(this.parseMultiEnd2) : (this.state.buf += '"', this.goto(this.parseMultiStringContent))
        }

        parseMultiEnd2() {
            return this.char === CHAR_QUOT ? this.next(this.parseMultiEnd3) : (this.state.buf += '""', this.goto(this.parseMultiStringContent))
        }

        parseMultiEnd3() {
            return this.char === CHAR_QUOT ? (this.state.buf += '"', this.next(this.parseMultiEnd4)) : this.returnNow()
        }

        parseMultiEnd4() {
            return this.char === CHAR_QUOT ? (this.state.buf += '"', this.return()) : this.returnNow()
        }

        parseMultiEscape() {
            return this.char === CTRL_M || this.char === CTRL_J ? this.next(this.parseMultiTrim) : this.char === CHAR_SP || this.char === CTRL_I ? this.next(this.parsePreMultiTrim) : this.goto(this.parseEscape)
        }

        parsePreMultiTrim() {
            if (this.char === CHAR_SP || this.char === CTRL_I) return null;
            if (this.char === CTRL_M || this.char === CTRL_J) return this.next(this.parseMultiTrim);
            throw this.error(new TomlError("Can't escape whitespace"))
        }

        parseMultiTrim() {
            return this.char === CTRL_J || this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M ? null : this.returnNow()
        }

        parseEscape() {
            if (this.char in escapes) return this.return(escapes[this.char]);
            if (this.char === CHAR_u) return this.call(this.parseSmallUnicode, this.parseUnicodeReturn);
            if (this.char === CHAR_U) return this.call(this.parseLargeUnicode, this.parseUnicodeReturn);
            throw this.error(new TomlError("Unknown escape character: " + this.char))
        }

        parseUnicodeReturn(n) {
            try {
                const o = parseInt(n, 16);
                if (o >= SURROGATE_FIRST && o <= SURROGATE_LAST) throw this.error(new TomlError("Invalid unicode, character in range 0xD800 - 0xDFFF is reserved"));
                return this.returnNow(String.fromCodePoint(o))
            } catch (o) {
                throw this.error(TomlError.wrap(o))
            }
        }

        parseSmallUnicode() {
            if (isHexit(this.char)) {
                if (this.consume(), this.state.buf.length >= 4) return this.return()
            } else throw this.error(new TomlError("Invalid character in unicode sequence, expected hex"))
        }

        parseLargeUnicode() {
            if (isHexit(this.char)) {
                if (this.consume(), this.state.buf.length >= 8) return this.return()
            } else throw this.error(new TomlError("Invalid character in unicode sequence, expected hex"))
        }

        parseNumberSign() {
            return this.consume(), this.next(this.parseMaybeSignedInfOrNan)
        }

        parseMaybeSignedInfOrNan() {
            return this.char === CHAR_i ? this.next(this.parseInf) : this.char === CHAR_n ? this.next(this.parseNan) : this.callNow(this.parseNoUnder, this.parseNumberIntegerStart)
        }

        parseNumberIntegerStart() {
            return this.char === CHAR_0 ? (this.consume(), this.next(this.parseNumberIntegerExponentOrDecimal)) : this.goto(this.parseNumberInteger)
        }

        parseNumberIntegerExponentOrDecimal() {
            return this.char === CHAR_PERIOD ? (this.consume(), this.call(this.parseNoUnder, this.parseNumberFloat)) : this.char === CHAR_E || this.char === CHAR_e ? (this.consume(), this.next(this.parseNumberExponentSign)) : this.returnNow(Integer(this.state.buf))
        }

        parseNumberInteger() {
            if (isDigit(this.char)) this.consume(); else {
                if (this.char === CHAR_LOWBAR) return this.call(this.parseNoUnder);
                if (this.char === CHAR_E || this.char === CHAR_e) return this.consume(), this.next(this.parseNumberExponentSign);
                if (this.char === CHAR_PERIOD) return this.consume(), this.call(this.parseNoUnder, this.parseNumberFloat);
                {
                    const n = Integer(this.state.buf);
                    if (n.isNaN()) throw this.error(new TomlError("Invalid number"));
                    return this.returnNow(n)
                }
            }
        }

        parseNoUnder() {
            if (this.char === CHAR_LOWBAR || this.char === CHAR_PERIOD || this.char === CHAR_E || this.char === CHAR_e) throw this.error(new TomlError("Unexpected character, expected digit"));
            if (this.atEndOfWord()) throw this.error(new TomlError("Incomplete number"));
            return this.returnNow()
        }

        parseNoUnderHexOctBinLiteral() {
            if (this.char === CHAR_LOWBAR || this.char === CHAR_PERIOD) throw this.error(new TomlError("Unexpected character, expected digit"));
            if (this.atEndOfWord()) throw this.error(new TomlError("Incomplete number"));
            return this.returnNow()
        }

        parseNumberFloat() {
            if (this.char === CHAR_LOWBAR) return this.call(this.parseNoUnder, this.parseNumberFloat);
            if (isDigit(this.char)) this.consume(); else return this.char === CHAR_E || this.char === CHAR_e ? (this.consume(), this.next(this.parseNumberExponentSign)) : this.returnNow(Float(this.state.buf))
        }

        parseNumberExponentSign() {
            if (isDigit(this.char)) return this.goto(this.parseNumberExponent);
            if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) this.consume(), this.call(this.parseNoUnder, this.parseNumberExponent); else throw this.error(new TomlError("Unexpected character, expected -, + or digit"))
        }

        parseNumberExponent() {
            if (isDigit(this.char)) this.consume(); else return this.char === CHAR_LOWBAR ? this.call(this.parseNoUnder) : this.returnNow(Float(this.state.buf))
        }

        parseNumberOrDateTime() {
            return this.char === CHAR_0 ? (this.consume(), this.next(this.parseNumberBaseOrDateTime)) : this.goto(this.parseNumberOrDateTimeOnly)
        }

        parseNumberOrDateTimeOnly() {
            if (this.char === CHAR_LOWBAR) return this.call(this.parseNoUnder, this.parseNumberInteger);
            if (isDigit(this.char)) this.consume(), this.state.buf.length > 4 && this.next(this.parseNumberInteger); else return this.char === CHAR_E || this.char === CHAR_e ? (this.consume(), this.next(this.parseNumberExponentSign)) : this.char === CHAR_PERIOD ? (this.consume(), this.call(this.parseNoUnder, this.parseNumberFloat)) : this.char === CHAR_HYPHEN ? this.goto(this.parseDateTime) : this.char === CHAR_COLON ? this.goto(this.parseOnlyTimeHour) : this.returnNow(Integer(this.state.buf))
        }

        parseDateTimeOnly() {
            if (this.state.buf.length < 4) {
                if (isDigit(this.char)) return this.consume();
                if (this.char === CHAR_COLON) return this.goto(this.parseOnlyTimeHour);
                throw this.error(new TomlError("Expected digit while parsing year part of a date"))
            } else {
                if (this.char === CHAR_HYPHEN) return this.goto(this.parseDateTime);
                throw this.error(new TomlError("Expected hyphen (-) while parsing year part of date"))
            }
        }

        parseNumberBaseOrDateTime() {
            return this.char === CHAR_b ? (this.consume(), this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerBin)) : this.char === CHAR_o ? (this.consume(), this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerOct)) : this.char === CHAR_x ? (this.consume(), this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerHex)) : this.char === CHAR_PERIOD ? this.goto(this.parseNumberInteger) : isDigit(this.char) ? this.goto(this.parseDateTimeOnly) : this.returnNow(Integer(this.state.buf))
        }

        parseIntegerHex() {
            if (isHexit(this.char)) this.consume(); else {
                if (this.char === CHAR_LOWBAR) return this.call(this.parseNoUnderHexOctBinLiteral);
                {
                    const n = Integer(this.state.buf);
                    if (n.isNaN()) throw this.error(new TomlError("Invalid number"));
                    return this.returnNow(n)
                }
            }
        }

        parseIntegerOct() {
            if (isOctit(this.char)) this.consume(); else {
                if (this.char === CHAR_LOWBAR) return this.call(this.parseNoUnderHexOctBinLiteral);
                {
                    const n = Integer(this.state.buf);
                    if (n.isNaN()) throw this.error(new TomlError("Invalid number"));
                    return this.returnNow(n)
                }
            }
        }

        parseIntegerBin() {
            if (isBit(this.char)) this.consume(); else {
                if (this.char === CHAR_LOWBAR) return this.call(this.parseNoUnderHexOctBinLiteral);
                {
                    const n = Integer(this.state.buf);
                    if (n.isNaN()) throw this.error(new TomlError("Invalid number"));
                    return this.returnNow(n)
                }
            }
        }

        parseDateTime() {
            if (this.state.buf.length < 4) throw this.error(new TomlError("Years less than 1000 must be zero padded to four characters"));
            return this.state.result = this.state.buf, this.state.buf = "", this.next(this.parseDateMonth)
        }

        parseDateMonth() {
            if (this.char === CHAR_HYPHEN) {
                if (this.state.buf.length < 2) throw this.error(new TomlError("Months less than 10 must be zero padded to two characters"));
                return this.state.result += "-" + this.state.buf, this.state.buf = "", this.next(this.parseDateDay)
            } else if (isDigit(this.char)) this.consume(); else throw this.error(new TomlError("Incomplete datetime"))
        }

        parseDateDay() {
            if (this.char === CHAR_T || this.char === CHAR_SP) {
                if (this.state.buf.length < 2) throw this.error(new TomlError("Days less than 10 must be zero padded to two characters"));
                return this.state.result += "-" + this.state.buf, this.state.buf = "", this.next(this.parseStartTimeHour)
            } else {
                if (this.atEndOfWord()) return this.returnNow(createDate(this.state.result + "-" + this.state.buf));
                if (isDigit(this.char)) this.consume(); else throw this.error(new TomlError("Incomplete datetime"))
            }
        }

        parseStartTimeHour() {
            return this.atEndOfWord() ? this.returnNow(createDate(this.state.result)) : this.goto(this.parseTimeHour)
        }

        parseTimeHour() {
            if (this.char === CHAR_COLON) {
                if (this.state.buf.length < 2) throw this.error(new TomlError("Hours less than 10 must be zero padded to two characters"));
                return this.state.result += "T" + this.state.buf, this.state.buf = "", this.next(this.parseTimeMin)
            } else if (isDigit(this.char)) this.consume(); else throw this.error(new TomlError("Incomplete datetime"))
        }

        parseTimeMin() {
            if (this.state.buf.length < 2 && isDigit(this.char)) this.consume(); else {
                if (this.state.buf.length === 2 && this.char === CHAR_COLON) return this.state.result += ":" + this.state.buf, this.state.buf = "", this.next(this.parseTimeSec);
                throw this.error(new TomlError("Incomplete datetime"))
            }
        }

        parseTimeSec() {
            if (isDigit(this.char)) {
                if (this.consume(), this.state.buf.length === 2) return this.state.result += ":" + this.state.buf, this.state.buf = "", this.next(this.parseTimeZoneOrFraction)
            } else throw this.error(new TomlError("Incomplete datetime"))
        }

        parseOnlyTimeHour() {
            if (this.char === CHAR_COLON) {
                if (this.state.buf.length < 2) throw this.error(new TomlError("Hours less than 10 must be zero padded to two characters"));
                return this.state.result = this.state.buf, this.state.buf = "", this.next(this.parseOnlyTimeMin)
            } else throw this.error(new TomlError("Incomplete time"))
        }

        parseOnlyTimeMin() {
            if (this.state.buf.length < 2 && isDigit(this.char)) this.consume(); else {
                if (this.state.buf.length === 2 && this.char === CHAR_COLON) return this.state.result += ":" + this.state.buf, this.state.buf = "", this.next(this.parseOnlyTimeSec);
                throw this.error(new TomlError("Incomplete time"))
            }
        }

        parseOnlyTimeSec() {
            if (isDigit(this.char)) {
                if (this.consume(), this.state.buf.length === 2) return this.next(this.parseOnlyTimeFractionMaybe)
            } else throw this.error(new TomlError("Incomplete time"))
        }

        parseOnlyTimeFractionMaybe() {
            if (this.state.result += ":" + this.state.buf, this.char === CHAR_PERIOD) this.state.buf = "", this.next(this.parseOnlyTimeFraction); else return this.return(createTime(this.state.result))
        }

        parseOnlyTimeFraction() {
            if (isDigit(this.char)) this.consume(); else if (this.atEndOfWord()) {
                if (this.state.buf.length === 0) throw this.error(new TomlError("Expected digit in milliseconds"));
                return this.returnNow(createTime(this.state.result + "." + this.state.buf))
            } else throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"))
        }

        parseTimeZoneOrFraction() {
            if (this.char === CHAR_PERIOD) this.consume(), this.next(this.parseDateTimeFraction); else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) this.consume(), this.next(this.parseTimeZoneHour); else {
                if (this.char === CHAR_Z) return this.consume(), this.return(createDateTime(this.state.result + this.state.buf));
                if (this.atEndOfWord()) return this.returnNow(createDateTimeFloat(this.state.result + this.state.buf));
                throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"))
            }
        }

        parseDateTimeFraction() {
            if (isDigit(this.char)) this.consume(); else {
                if (this.state.buf.length === 1) throw this.error(new TomlError("Expected digit in milliseconds"));
                if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) this.consume(), this.next(this.parseTimeZoneHour); else {
                    if (this.char === CHAR_Z) return this.consume(), this.return(createDateTime(this.state.result + this.state.buf));
                    if (this.atEndOfWord()) return this.returnNow(createDateTimeFloat(this.state.result + this.state.buf));
                    throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"))
                }
            }
        }

        parseTimeZoneHour() {
            if (isDigit(this.char)) {
                if (this.consume(), /\d\d$/.test(this.state.buf)) return this.next(this.parseTimeZoneSep)
            } else throw this.error(new TomlError("Unexpected character in datetime, expected digit"))
        }

        parseTimeZoneSep() {
            if (this.char === CHAR_COLON) this.consume(), this.next(this.parseTimeZoneMin); else throw this.error(new TomlError("Unexpected character in datetime, expected colon"))
        }

        parseTimeZoneMin() {
            if (isDigit(this.char)) {
                if (this.consume(), /\d\d$/.test(this.state.buf)) return this.return(createDateTime(this.state.result + this.state.buf))
            } else throw this.error(new TomlError("Unexpected character in datetime, expected digit"))
        }

        parseBoolean() {
            if (this.char === CHAR_t) return this.consume(), this.next(this.parseTrue_r);
            if (this.char === CHAR_f) return this.consume(), this.next(this.parseFalse_a)
        }

        parseTrue_r() {
            if (this.char === CHAR_r) return this.consume(), this.next(this.parseTrue_u);
            throw this.error(new TomlError("Invalid boolean, expected true or false"))
        }

        parseTrue_u() {
            if (this.char === CHAR_u) return this.consume(), this.next(this.parseTrue_e);
            throw this.error(new TomlError("Invalid boolean, expected true or false"))
        }

        parseTrue_e() {
            if (this.char === CHAR_e) return this.return(!0);
            throw this.error(new TomlError("Invalid boolean, expected true or false"))
        }

        parseFalse_a() {
            if (this.char === CHAR_a) return this.consume(), this.next(this.parseFalse_l);
            throw this.error(new TomlError("Invalid boolean, expected true or false"))
        }

        parseFalse_l() {
            if (this.char === CHAR_l) return this.consume(), this.next(this.parseFalse_s);
            throw this.error(new TomlError("Invalid boolean, expected true or false"))
        }

        parseFalse_s() {
            if (this.char === CHAR_s) return this.consume(), this.next(this.parseFalse_e);
            throw this.error(new TomlError("Invalid boolean, expected true or false"))
        }

        parseFalse_e() {
            if (this.char === CHAR_e) return this.return(!1);
            throw this.error(new TomlError("Invalid boolean, expected true or false"))
        }

        parseInlineList() {
            if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M || this.char === CTRL_J) return null;
            if (this.char === e.END) throw this.error(new TomlError("Unterminated inline array"));
            return this.char === CHAR_NUM ? this.call(this.parseComment) : this.char === CHAR_RSQB ? this.return(this.state.resultArr || InlineList()) : this.callNow(this.parseValue, this.recordInlineListValue)
        }

        recordInlineListValue(n) {
            return this.state.resultArr || (this.state.resultArr = InlineList(tomlType(n))), isFloat(n) || isInteger(n) ? this.state.resultArr.push(n.valueOf()) : this.state.resultArr.push(n), this.goto(this.parseInlineListNext)
        }

        parseInlineListNext() {
            if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M || this.char === CTRL_J) return null;
            if (this.char === CHAR_NUM) return this.call(this.parseComment);
            if (this.char === CHAR_COMMA) return this.next(this.parseInlineList);
            if (this.char === CHAR_RSQB) return this.goto(this.parseInlineList);
            throw this.error(new TomlError("Invalid character, expected whitespace, comma (,) or close bracket (])"))
        }

        parseInlineTable() {
            if (this.char === CHAR_SP || this.char === CTRL_I) return null;
            if (this.char === e.END || this.char === CHAR_NUM || this.char === CTRL_J || this.char === CTRL_M) throw this.error(new TomlError("Unterminated inline array"));
            return this.char === CHAR_RCUB ? this.return(this.state.resultTable || InlineTable()) : (this.state.resultTable || (this.state.resultTable = InlineTable()), this.callNow(this.parseAssign, this.recordInlineTableValue))
        }

        recordInlineTableValue(n) {
            let o = this.state.resultTable, a = n.key.pop();
            for (let l of n.key) {
                if (hasKey(o, l) && (!isTable(o[l]) || o[l][_declared])) throw this.error(new TomlError("Can't redefine existing key"));
                o = o[l] = o[l] || Table()
            }
            if (hasKey(o, a)) throw this.error(new TomlError("Can't redefine existing key"));
            return isInteger(n.value) || isFloat(n.value) ? o[a] = n.value.valueOf() : o[a] = n.value, this.goto(this.parseInlineTableNext)
        }

        parseInlineTableNext() {
            if (this.char === CHAR_SP || this.char === CTRL_I) return null;
            if (this.char === e.END || this.char === CHAR_NUM || this.char === CTRL_J || this.char === CTRL_M) throw this.error(new TomlError("Unterminated inline array"));
            if (this.char === CHAR_COMMA) return this.next(this.parseInlineTablePostComma);
            if (this.char === CHAR_RCUB) return this.goto(this.parseInlineTable);
            throw this.error(new TomlError("Invalid character, expected whitespace, comma (,) or close bracket (])"))
        }

        parseInlineTablePostComma() {
            if (this.char === CHAR_SP || this.char === CTRL_I) return null;
            if (this.char === e.END || this.char === CHAR_NUM || this.char === CTRL_J || this.char === CTRL_M) throw this.error(new TomlError("Unterminated inline array"));
            if (this.char === CHAR_COMMA) throw this.error(new TomlError("Empty elements in inline tables are not permitted"));
            if (this.char === CHAR_RCUB) throw this.error(new TomlError("Trailing commas in inline tables are not permitted"));
            return this.goto(this.parseInlineTable)
        }
    }

    return t
}

function TomlParse(e) {
    globalThis.Buffer && globalThis.Buffer.isBuffer(e) && (e = e.toString("utf8"));
    const t = new parserClass;
    try {
        return t.parse(e), t.finish()
    } catch (r) {
        console.log(r)
    }
}

const pathParams = ["pretrained_model_name_or_path", "train_data_dir", "reg_data_dir", "output_dir", "network_weights"],
    floatParmas = ["learning_rate", "unet_lr", "text_encoder_lr", "learning_rate_te", "learning_rate_te1", "learning_rate_te2"],
    needDeleteParams = ["lycoris_algo", "conv_dim", "conv_alpha", "dropout", "dylora_unit", "lokr_factor", "train_norm", "down_lr_weight", "mid_lr_weight", "up_lr_weight", "block_lr_zero_threshold", "enable_block_weights", "enable_preview", "network_args_custom", "optimizer_args_custom", "enable_base_weight", "prodigy_d0", "prodigy_d_coef", "ui_custom_params"],
    testNoneParams = ["vae", "reg_data_dir", "network_weights", "noise_offset", "multires_noise_iterations", "multires_noise_discount", "caption_dropout_rate", "network_dropout", "scale_weight_norms", "gpu_ids"],
    conflictParams = [["cache_text_encoder_outputs", "shuffle_caption"], ["noise_offset", "multires_noise_iterations"], ["cache_latents", "color_aug"], ["cache_latents", "random_crop"]],
    checkParams = e => {
        let t = {warnings: [], errors: []};
        const r = n => !!n;
        e.optimizer_type.startsWith("DAdapt") && e.lr_scheduler != "constant" && t.warnings.push("\u60A8\u4F7F\u7528\u4E86 DAdaptation \u7CFB\u5217\u4F18\u5316\u5668\uFF0C\u82E5\u60F3\u5229\u7528\u5B83\u83B7\u5F97\u5B66\u4E60\u7387\uFF0C\u8BF7\u5C06 lr_scheduler \u8BBE\u7F6E\u4E3A constant"), e.optimizer_type.startsWith("prodigy") && (e.unet_lr != 1 || e.text_encoder_lr != 1) && t.warnings.push("\u60A8\u4F7F\u7528\u4E86 prodigy \u4F18\u5316\u5668\uFF0C\u82E5\u60F3\u5229\u7528\u5B83\u83B7\u5F97\u5B66\u4E60\u7387\uFF0C\u8BF7\u5C06 unet_lr\u3001text_encoder_lr \u8BBE\u7F6E\u4E3A 1"), e.network_module == "networks.oft" && e.model_train_type != "sdxl-lora" && t.errors.push("OFT \u76EE\u524D\u4EC5\u5BF9 SDXL \u53EF\u7528");
        for (let n of conflictParams) r(e[n[0]]) && r(e[n[1]]) && t.errors.push(`\u53C2\u6570 ${n[0]} \u4E0E ${n[1]} \u51B2\u7A81\uFF0C\u8BF7\u53EA\u542F\u7528\u5176\u4E2D\u4E00\u4E2A`);
        return t
    }, parseParamsRe = e => {
        for (const t of floatParmas) {
            if (!e.hasOwnProperty(t)) continue;
            let r = e[t].toExponential();
            r.length <= 6 ? e[t] = r : e[t] = e[t].toString()
        }
        return e
    }, isSDXLModel = e => {
        var t;
        return (t = e.model_train_type) == null ? void 0 : t.startsWith("sdxl")
    }, parseParams = (e, t) => {
        if (e.network_args = [], e.optimizer_args = [], t == "lora-basic") {
            let r = e;
            e = clone(BasicLoraParams), e = Object.assign(e, r)
        }
        e.model_train_type == "sd-dreambooth" ? (delete e.learning_rate_te1, delete e.learning_rate_te2) : isSDXLModel(e) && (delete e.learning_rate_te, delete e.stop_text_encoder_training, (e.learning_rate_te1 || e.learning_rate_te2) && (e.train_text_encoder = !0)), isSDXLModel(e) && delete e.clip_skip, e.network_module == "lycoris.kohya" ? (e.network_args = [...e.network_args, "conv_dim=" + e.conv_dim, "conv_alpha=" + e.conv_alpha, "dropout=" + e.dropout, "algo=" + e.lycoris_algo], e.lokr_factor && e.network_args.push(`factor=${e.lokr_factor}`), e.train_norm && e.network_args.push("train_norm=True")) : e.network_module == "networks.dylora" && (e.network_args = [...e.network_args, "unit=" + e.dylora_unit]), e.optimizer_type.toLowerCase().startsWith("dada") ? ((e.optimizer_type == "DAdaptation" || e.optimizer_type == "DAdaptAdam") && (e.optimizer_args = ["decouple=True", "weight_decay=0.01"]), e.learning_rate = 1, e.unet_lr = 1, e.text_encoder_lr = 1) : e.optimizer_type.toLowerCase() == "prodigy" && (e.optimizer_args = ["decouple=True", "weight_decay=0.01", "use_bias_correction=True", `d_coef=${e.prodigy_d_coef}`], e.lr_warmup_steps && e.optimizer_args.push("safeguard_warmup=True"), e.prodigy_d0 && e.optimizer_args.push(`d0=${e.prodigy_d0}`)), e.enable_block_weights && (e.network_args = [...e.network_args, "down_lr_weight=" + e.down_lr_weight, "mid_lr_weight=" + e.mid_lr_weight, "up_lr_weight=" + e.up_lr_weight, "block_lr_zero_threshold=" + e.block_lr_zero_threshold], delete e.block_lr_zero_threshold), e.enable_base_weight ? (e.base_weights && (e.base_weights = e.base_weights.split(`
`)), e.base_weights_multiplier && (e.base_weights_multiplier = e.base_weights_multiplier.split(`
`).map(r => parseFloat(r)))) : (delete e.base_weights, delete e.base_weights_multiplier), e.network_args_custom && (e.network_args = [...e.network_args, ...e.network_args_custom]), e.optimizer_args_custom && (e.optimizer_args = [...e.optimizer_args, ...e.optimizer_args_custom]), e.enable_preview || (delete e.sample_prompts, delete e.sample_sampler, delete e.sample_every_n_epochs);
        for (const r of floatParmas) if (e.hasOwnProperty(r)) {
            const n = parseFloat(e[r]);
            e[r] = Number.isNaN(n) ? 0 : n
        }
        for (const r of testNoneParams) if (e.hasOwnProperty(r)) {
            let n = e[r];
            (n === 0 || n === "" || Array.isArray(n) && n.length === 0) && delete e[r]
        }
        for (const r of pathParams) e.hasOwnProperty(r) && e[r] && (e[r] = e[r].replaceAll("\\", "/"));
        if (["network_args", "optimizer_args"].forEach(r => {
            e[r].length == 0 && delete e[r]
        }), e.ui_custom_params) {
            let r;
            try {
                r = TomlParse(e.ui_custom_params), r && typeof r == "object" && (e = Object.assign(e, r))
            } catch (n) {
                console.error(n)
            }
        }
        for (const r of needDeleteParams) e.hasOwnProperty(r) && delete e[r];
        return e.gpu_ids && (e.gpu_ids = e.gpu_ids.map(r => r.match(/GPU (\d+):/)[1])), e
    }, BasicLoraParams = {
        pretrained_model_name_or_path: "./sd-models/model.safetensors",
        train_data_dir: "./train/aki",
        resolution: "512,512",
        enable_bucket: !0,
        min_bucket_reso: 256,
        max_bucket_reso: 1024,
        output_name: "aki",
        output_dir: "./output",
        save_model_as: "safetensors",
        save_every_n_epochs: 2,
        max_train_epochs: 10,
        train_batch_size: 1,
        network_train_unet_only: !1,
        network_train_text_encoder_only: !1,
        learning_rate: 1e-4,
        unet_lr: 1e-4,
        text_encoder_lr: 1e-5,
        lr_scheduler: "cosine_with_restarts",
        optimizer_type: "AdamW8bit",
        lr_scheduler_num_cycles: 1,
        network_module: "networks.lora",
        network_dim: 32,
        network_alpha: 32,
        logging_dir: "./logs",
        caption_extension: ".txt",
        shuffle_caption: !0,
        keep_tokens: 0,
        max_token_length: 255,
        seed: 1337,
        prior_loss_weight: 1,
        clip_skip: 2,
        mixed_precision: "fp16",
        save_precision: "fp16",
        xformers: !0,
        cache_latents: !0,
        persistent_data_loader_workers: !0
    }, delay = e => new Promise(t => setTimeout(t, e)), getGraphicCards = async () => {
        let e = 0;
        const t = 3;
        try {
            for (; e < t;) {
                let n = await (await get("/api/graphic_cards")).json();
                if (n.status === "success") return n.data.cards;
                if (n.status === "pending") await delay(1e3), e++; else return ElMessage.error("\u83B7\u53D6\u663E\u5361\u4FE1\u606F\u5931\u8D25\uFF0C\u5C06\u4F7F\u7528\u9ED8\u8BA4\u663E\u5361\uFF1A" + n.message), []
            }
            ElMessage.error("\u83B7\u53D6\u663E\u5361\u4FE1\u606F\u5931\u8D25\uFF0C\u5C06\u4F7F\u7528\u9ED8\u8BA4\u663E\u5361\uFF1A\u8BF7\u6C42\u8D85\u65F6")
        } catch (r) {
            ElMessage.error("\u83B7\u53D6\u663E\u5361\u4FE1\u606F\u5931\u8D25\uFF0C\u5C06\u4F7F\u7528\u9ED8\u8BA4\u663E\u5361\uFF1A" + r.message), console.log(r)
        }
        return []
    };
let cards = {initial: !1, data: []};
const applyToSchema = async e => (cards.initial || (cards.data = await getGraphicCards(), cards.initial = !0), cards.data.length < 2 || e.push(Schema.object({gpu_ids: Schema.array(Schema.union(cards.data)).description("\u9009\u62E9\u663E\u5361").role("select")}).description("\u663E\u5361\u8BBE\u7F6E")), e);

class SchemaManager {
    constructor() {
        this.schemas = []
    }

    loadLocalSchema() {
        this.schemas = localStorage.getItem("schemas") ? JSON.parse(localStorage.getItem("schemas")) : [];
        console.log(this.schemas);
    }

    async checkSchemaUpdates() {
        let t = (await (await get("/api/schemas/hashes")).json()).data.schemas, r = !1;
        for (let n of t) {
            let o = this.schemas.find(a => a.name === n.name);
            if (!o || o.hash !== n.hash) {
                r = !0;
                break
            }
        }
        return r
    }

    async loadServerSchema() {
        let t = await (await get("/api/schemas/all")).json();
        t.status == "success" && (localStorage.setItem("schemas", JSON.stringify(t.data.schemas)), this.schemas = t.data.schemas)
    }

    executeSchema() {
        this.schemas.forEach(async s => {
            let schema = eval(s.schema);
            s.schemaObject = schema
        }), console.log("Schemas executed")
    }

    getSchemaByName(name) {
        let schema = this.schemas.find(e => e.name === name);
        return schema ? eval(schema.schema) : Schema.object({})
    }

    getSchemaByNameWithCache(name) {
        let schema = this.schemas.find(e => e.name === name);
        if (schema) {
            if (schema.schemaObject != null) return schema.schemaObject;
            {
                let temp = eval(schema.schema);
                return schema.schemaObject = temp, temp
            }
        } else return Schema.object({})
    }

    async getGraphicOptionAppliedSchema(e) {
        let t = this.getSchemaByName(e);
        return await applyToSchema(t)
    }
}

const schemaManagerInstance = new SchemaManager, data$1 = {
    history_title: "\u5386\u53F2\u53C2\u6570",
    export: "\u5BFC\u51FA",
    import: "\u5BFC\u5165",
    date: "\u65E5\u671F",
    name: "\u540D\u79F0",
    apply: "\u4F7F\u7528",
    preview: "\u9884\u89C8",
    set_name: "\u8BBE\u7F6E\u540D\u79F0",
    delete: "\u5220\u9664",
    param_warnings: "\u53C2\u6570\u63D0\u793A",
    param_errors: "\u53C2\u6570\u9519\u8BEF",
    reset_all: "\u5168\u90E8\u91CD\u7F6E",
    save_params: "\u4FDD\u5B58\u53C2\u6570",
    read_params: "\u8BFB\u53D6\u53C2\u6570",
    download_config: "\u4E0B\u8F7D\u914D\u7F6E\u6587\u4EF6",
    import_config: "\u5BFC\u5165\u914D\u7F6E\u6587\u4EF6",
    start_train: "\u5F00\u59CB\u8BAD\u7EC3",
    stop_train: "\u7EC8\u6B62\u8BAD\u7EC3",
    output_header: "\u53C2\u6570\u9884\u89C8",
    wd_14_tagger: "WD 1.4 \u6807\u7B7E\u5668"
}, data = {
    history_title: "History Parameters",
    export: "Export",
    import: "Import",
    date: "Date",
    name: "Name",
    apply: "Apply",
    preview: "Preview",
    set_name: "Set Name",
    delete: "Delete",
    param_warnings: "Parameter Warnings",
    param_errors: "Parameter Errors",
    reset_all: "Reset All",
    save_params: "Save Parameters",
    read_params: "Read Parameters",
    download_config: "Download Config File",
    import_config: "Import Config File",
    start_train: "Start Training",
    stop_train: "Stop Training",
    output_header: "Output",
    wd_14_tagger: "WD 1.4 Tagger"
};
var main_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$5 = {class: "example-container"}, _hoisted_2$5 = {class: "history-header"},
    _hoisted_3$4 = {class: "header-left"}, _hoisted_4$4 = ["id"], _hoisted_5$4 = {class: "header-right"},
    _hoisted_6$4 = {class: "schema-container"}, _hoisted_7$1 = {class: "right-container"},
    _hoisted_8$1 = {class: "theme-default-content"}, _hoisted_9$1 = {class: "params-section"},
    _hoisted_10$1 = createBaseVNode("section", {id: "test-output"}, [createBaseVNode("header", null, "Output")], -1),
    _sfc_main$6 = defineComponent({
        __name: "main", setup(e) {
            let t = null;
            const r = usePageFrontmatter();
            let n = ref(null);
            const o = ref(null), a = ref({}), l = ref(null), u = ref(!1), c = ref([]), i = ref([]),
                _ = ["network_args_custom", "optimizer_args_custom"], {
                    t: d,
                    setLocaleMessage: p
                } = useI18n({messages: {"zh-CN": data$1, "en-US": data}});
            onBeforeMount(async () => {
                t = r.value.trainType, n.value = schemaManagerInstance.getSchemaByName(r.value.trainType), n.value = await schemaManagerInstance.getGraphicOptionAppliedSchema(t)
            }), onMounted(async () => {
                v(), w()
            }), onBeforeUnmount(() => {
                localStorage.setItem(`configs-${t}-autosave`, JSON.stringify(clone(a.value)))
            });
            const w = () => {
                try {
                    let m = localStorage.getItem(`configs-${t}-autosave`);
                    if (m != "null") {
                        let g = JSON.parse(m);
                        g != null && g != null && Object.keys(g).length > 0 && (a.value = g, ElMessage.success("\u5DF2\u81EA\u52A8\u52A0\u8F7D\u5386\u53F2\u53C2\u6570"))
                    }
                } catch (m) {
                    console.log(m)
                }
            }, B = () => {
                let m = a.value;
                _.forEach(C => {
                    m && m.hasOwnProperty(C) && m[C] != null && (m[C] = m[C].map(T => T || ""))
                });
                let g = n.value(m);
                return _.forEach(C => {
                    g.hasOwnProperty(C) && g[C].length == 0 && delete g[C]
                }), g
            };
            computed(() => {
                try {
                    return B()
                } catch (m) {
                    console.log(m)
                }
            });
            const y = computed(() => {
                try {
                    return L()
                } catch (m) {
                    console.log(m)
                }
            }), v = () => {
                const m = localStorage.getItem(`configs-${t}`);
                m ? l.value = JSON.parse(m).map(g => (!g.name && g.value && g.value.output_name && (g.name = g.value.output_name), g)) : l.value = []
            }, E = () => {
                localStorage.setItem(`configs-${r.value.trainType}`, JSON.stringify(l.value))
            }, k = () => {
                let m = {time: new Date().toLocaleString(), value: clone(a.value)};
                a.value && a.value.output_name && (m.name = a.value.output_name), l.value.push(m), E(), ElMessage.success("\u5DF2\u5C06\u4FEE\u6539\u4FDD\u5B58\u81F3\u6D4F\u89C8\u5668")
            }, R = () => {
                u.value = !0
            }, L = () => {
                if (n.value == null) return "Loading...";
                let m = B(), g = parseParams(m, t), C = checkParams(g);
                return c.value = C.warnings, i.value = C.errors, stringify(g)
            }, I = async () => {
                const m = parseParams(n.value(a.value), t);
                m.optimizer_type == "DAdaptation" && ElMessage.warning({
                    message: "DAdaptation \u8BAD\u7EC3\u65F6\uFF0C\u6240\u6709\u5B66\u4E60\u7387\u5C06\u88AB\u8BBE\u7F6E\u4E3A 1\u3002\u5E76\u4E14\u5B66\u4E60\u7387\u8C03\u5EA6\u5668\u5C06\u88AB\u8BBE\u7F6E\u4E3A constant\u3002",
                    duration: 5e3
                });
                try {
                    let g = await post("/api/run", JSON.stringify(m), {"Content-Type": "application/json"});
                    if (!g.ok) throw new Error("Network response was not ok");
                    let C = await g.json();
                    C.status == "success" ? ElMessage.success("\u8BAD\u7EC3\u4EFB\u52A1\u5DF2\u63D0\u4EA4" + C.message) : ElMessage.error("\u8BAD\u7EC3\u4EFB\u52A1\u63D0\u4EA4\u5931\u8D25\uFF1A" + C.message)
                } catch (g) {
                    ElMessage.error("\u65E0\u6CD5\u8FDE\u63A5\u5230\u8BAD\u7EC3\u7AEF\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u5F00\u542F\u8BAD\u7EC3\u7AEF\u3002"), console.error("There was a problem with the fetch operation:", g)
                }
            }, D = async () => {
                let m = null;
                try {
                    let H = (await (await fetch("/api/tasks")).json()).data.tasks.filter(N => N.status == "RUNNING");
                    if (H.length == 0) {
                        ElMessage.warning("\u5F53\u524D\u6CA1\u6709\u6B63\u5728\u8FD0\u884C\u7684\u8BAD\u7EC3\u4EFB\u52A1");
                        return
                    }
                    m = H[0]
                } catch (C) {
                    ElMessage.error("\u83B7\u53D6\u8FD0\u884C\u4E2D\u4EFB\u52A1\u5931\u8D25"), console.error("There was a problem with the fetch operation:", C);
                    return
                }
                const g = await ElMessageBox.confirm(`\u786E\u5B9A\u8981\u505C\u6B62\u4EFB\u52A1 ${m.id} \u5417\uFF1F`, "\u63D0\u793A", {
                    confirmButtonText: "\u786E\u5B9A",
                    cancelButtonText: "\u53D6\u6D88",
                    type: "warning"
                });
                try {
                    if (g === "confirm") {
                        let C = await get(`/api/tasks/terminate/${m.id}`);
                        if (!C.ok) throw new Error("Network response was not ok");
                        let T = await C.json();
                        T.status == "success" ? ElMessage.success("\u505C\u6B62\u4EFB\u52A1\u6210\u529F") : ElMessage.error("\u505C\u6B62\u4EFB\u52A1\u5931\u8D25\uFF1A" + T.messsage)
                    }
                } catch (C) {
                    ElMessage.error("\u65E0\u6CD5\u8FDE\u63A5\u5230\u8BAD\u7EC3\u7AEF\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u5F00\u542F\u8BAD\u7EC3\u7AEF\u3002"), console.error("There was a problem with the fetch operation:", C)
                }
            }, O = () => {
                a.value = null
            }, V = (m, g) => {
                const C = new Blob([g], {type: "text/plain;charset=utf-8"}), T = URL.createObjectURL(C),
                    $ = document.createElement("a");
                $.href = T, $.download = m, $.click(), URL.revokeObjectURL(T)
            }, W = () => {
                const m = L(), C = `${new Date().getTime()}.toml`;
                V(C, m)
            }, S = () => {
                const m = document.createElement("input");
                m.type = "file", m.accept = ".toml", m.onchange = g => {
                    const C = g.target.files[0], T = new FileReader;
                    T.onload = $ => {
                        const H = $.target.result;
                        try {
                            let N = parseParamsRe(TomlParse(H));
                            console.log(N);
                            let U = n.value();
                            a.value == null && (a.value = {});
                            for (let F in N) U.hasOwnProperty(F) && U[F] != null && U[F] != N[F] && (a.value[F] = N[F]);
                            ElMessage.success("\u5BFC\u5165\u6210\u529F")
                        } catch (N) {
                            console.log(N), ElMessage.error("\u5BFC\u5165\u5931\u8D25")
                        }
                    }, T.readAsText(C)
                }, m.click()
            }, M = (m, g) => {
                a.value = clone(g.value), u.value = !1, ElMessage.success("\u5DF2\u5C06\u5386\u53F2\u53C2\u6570\u5E94\u7528\u81F3\u5F53\u524D\u53C2\u6570")
            }, K = (m, g) => {
                const C = stringify(parseParams(n.value(clone(g.value)), t));
                ElMessageBox.alert(C, "\u9884\u89C8", {
                    confirmButtonText: "\u786E\u5B9A",
                    customStyle: {whiteSpace: "pre-line"}
                })
            }, P = (m, g) => {
                ElMessageBox.confirm("\u6B64\u64CD\u4F5C\u5C06\u6C38\u4E45\u5220\u9664\u8BE5\u53C2\u6570\u914D\u7F6E, \u662F\u5426\u7EE7\u7EED?", "\u63D0\u793A", {
                    confirmButtonText: "\u786E\u5B9A",
                    cancelButtonText: "\u53D6\u6D88",
                    type: "warning"
                }).then(() => {
                    l.value.splice(m, 1), E(), ElMessage.success("\u5220\u9664\u6210\u529F")
                })
            }, j = (m, g) => {
                ElMessageBox.prompt("\u8BF7\u8F93\u5165\u540D\u79F0", "\u91CD\u547D\u540D", {
                    confirmButtonText: "\u786E\u8BA4",
                    cancelButtonText: "\u53D6\u6D88"
                }).then(({value: C}) => {
                    g.name = C, E(), ElMessage.success("\u91CD\u547D\u540D\u6210\u529F")
                }).catch(() => {
                    ElMessage.info("\u53D6\u6D88\u91CD\u547D\u540D")
                })
            }, b = () => {
                const g = `${new Date().getTime()}.json`;
                V(g, JSON.stringify(l.value))
            }, x = () => {
                const m = document.createElement("input");
                m.type = "file", m.accept = ".json", m.onchange = g => {
                    const C = g.target.files[0], T = new FileReader;
                    T.onload = $ => {
                        const H = $.target.result;
                        try {
                            const N = JSON.parse(H);
                            N instanceof Array ? (l.value = [...l.value, ...N], E(), ElMessage.success("\u5BFC\u5165\u6210\u529F")) : ElMessage.error("\u5BFC\u5165\u5931\u8D25\uFF1A\u6587\u4EF6\u683C\u5F0F\u9519\u8BEF")
                        } catch {
                            ElMessage.error("\u5BFC\u5165\u5931\u8D25\uFF1A\u6587\u4EF6\u683C\u5F0F\u9519\u8BEF")
                        }
                    }, T.readAsText(C)
                }, m.click()
            };
            return (m, g) => {
                const C = resolveComponent("el-button"), T = resolveComponent("el-table-column"),
                    $ = resolveComponent("el-table"), H = resolveComponent("el-dialog"),
                    N = resolveComponent("k-schema"), U = resolveComponent("el-scrollbar"),
                    F = resolveComponent("content"), z = resolveComponent("el-col"), G = resolveComponent("el-row");
                return openBlock(), createElementBlock("div", _hoisted_1$5, [createVNode(unref(ClientOnly), null, {
                    default: withCtx(() => [createVNode(H, {
                        modelValue: u.value,
                        "onUpdate:modelValue": g[0] || (g[0] = A => u.value = A),
                        "append-to-body": !0
                    }, {
                        header: withCtx(({
                                             close: A,
                                             titleId: J,
                                             titleClass: Q
                                         }) => [createBaseVNode("div", _hoisted_2$5, [createBaseVNode("div", _hoisted_3$4, [createBaseVNode("h5", {
                            id: J,
                            class: normalizeClass(Q),
                            style: {margin: "0"}
                        }, toDisplayString(unref(d)("history_title")), 11, _hoisted_4$4)]), createBaseVNode("div", _hoisted_5$4, [createVNode(C, {
                            size: "small",
                            onClick: b
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("export")), 1)]),
                            _: 1
                        }), createVNode(C, {
                            size: "small",
                            onClick: x
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("import")), 1)]),
                            _: 1
                        })])])]),
                        default: withCtx(() => [createVNode($, {
                            data: l.value,
                            style: {width: "100%"}
                        }, {
                            default: withCtx(() => [createVNode(T, {
                                label: unref(d)("date"),
                                property: "time",
                                width: "180"
                            }, null, 8, ["label"]), createVNode(T, {
                                label: unref(d)("name"),
                                property: "name",
                                width: "180"
                            }, null, 8, ["label"]), createVNode(T, {align: "right"}, {
                                default: withCtx(A => [createVNode(C, {
                                    size: "small",
                                    onClick: J => M(A.$index, A.row)
                                }, {
                                    default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("apply")), 1)]),
                                    _: 2
                                }, 1032, ["onClick"]), createVNode(C, {
                                    size: "small",
                                    onClick: J => K(A.$index, A.row)
                                }, {
                                    default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("preview")), 1)]),
                                    _: 2
                                }, 1032, ["onClick"]), createVNode(C, {
                                    size: "small",
                                    onClick: J => j(A.$index, A.row)
                                }, {
                                    default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("set_name")), 1)]),
                                    _: 2
                                }, 1032, ["onClick"]), createVNode(C, {
                                    size: "small",
                                    type: "danger",
                                    onClick: J => P(A.$index, A.row)
                                }, {
                                    default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("delete")), 1)]),
                                    _: 2
                                }, 1032, ["onClick"])]), _: 1
                            })]), _: 1
                        }, 8, ["data"])]),
                        _: 1
                    }, 8, ["modelValue"])]), _: 1
                }), createBaseVNode("section", _hoisted_6$4, [createVNode(U, null, {
                    default: withCtx(() => [createBaseVNode("form", null, [createVNode(N, {
                        modelValue: a.value,
                        "onUpdate:modelValue": g[1] || (g[1] = A => a.value = A),
                        initial: o.value,
                        schema: unref(n)
                    }, null, 8, ["modelValue", "initial", "schema"])])]), _: 1
                })]), createBaseVNode("div", _hoisted_7$1, [createBaseVNode("section", _hoisted_8$1, [createVNode(U, null, {
                    default: withCtx(() => [createBaseVNode("main", null, [createVNode(F)])]),
                    _: 1
                })]), createBaseVNode("section", null, [createBaseVNode("header", null, toDisplayString(unref(d)("output_header")), 1), createBaseVNode("main", _hoisted_9$1, [createBaseVNode("code", null, [createVNode(U, {"max-height": "60vh"}, {
                    default: withCtx(() => [c.value.length != 0 ? (openBlock(), createBlock(unref(ElAlert), {
                        key: 0, title: unref(d)("param_warnings"), type: "warning", description: c.value.join(`
`), "show-icon": ""
                    }, null, 8, ["title", "description"])) : createCommentVNode("", !0), i.value.length != 0 ? (openBlock(), createBlock(unref(ElAlert), {
                        key: 1, title: unref(d)("param_errors"), type: "error", description: i.value.join(`
`), "show-icon": ""
                    }, null, 8, ["title", "description"])) : createCommentVNode("", !0), createTextVNode(toDisplayString(y.value), 1)]),
                    _: 1
                })])])]), createVNode(G, {
                    gutter: 10,
                    style: {margin: "0px 20px 10px 20px"}
                }, {
                    default: withCtx(() => [createVNode(z, {
                        span: 8,
                        style: {"padding-left": "0"}
                    }, {
                        default: withCtx(() => [createVNode(C, {
                            class: "max-btn",
                            onClick: O
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("reset_all")), 1)]),
                            _: 1
                        })]), _: 1
                    }), createVNode(z, {span: 8}, {
                        default: withCtx(() => [createVNode(C, {
                            class: "max-btn",
                            onClick: k
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("save_params")), 1)]),
                            _: 1
                        })]), _: 1
                    }), createVNode(z, {span: 8}, {
                        default: withCtx(() => [createVNode(C, {
                            class: "max-btn",
                            onClick: R
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("read_params")), 1)]),
                            _: 1
                        })]), _: 1
                    })]), _: 1
                }), createVNode(G, {
                    gutter: 10,
                    style: {margin: "0px 20px 10px 20px"}
                }, {
                    default: withCtx(() => [createVNode(z, {
                        span: 12,
                        style: {"padding-left": "0"}
                    }, {
                        default: withCtx(() => [createVNode(C, {
                            class: "max-btn",
                            onClick: W
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("download_config")), 1)]),
                            _: 1
                        })]), _: 1
                    }), createVNode(z, {span: 12}, {
                        default: withCtx(() => [createVNode(C, {
                            class: "max-btn",
                            onClick: S
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("import_config")), 1)]),
                            _: 1
                        })]), _: 1
                    })]), _: 1
                }), createVNode(G, {
                    gutter: 10,
                    style: {margin: "0px 20px 10px 20px"}
                }, {
                    default: withCtx(() => [createVNode(z, {
                        span: 12,
                        style: {"padding-left": "0"}
                    }, {
                        default: withCtx(() => [createVNode(C, {
                            plain: "",
                            class: "max-btn color-btn",
                            type: "primary",
                            onClick: I
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("start_train")), 1)]),
                            _: 1
                        })]), _: 1
                    }), createVNode(z, {span: 12}, {
                        default: withCtx(() => [createVNode(C, {
                            plain: "",
                            class: "max-btn color-btn",
                            type: "warning",
                            onClick: D
                        }, {
                            default: withCtx(() => [createTextVNode(toDisplayString(unref(d)("stop_train")), 1)]),
                            _: 1
                        })]), _: 1
                    })]), _: 1
                }), _hoisted_10$1])])
            }
        }
    });
var MainPage = _export_sfc$1(_sfc_main$6, [["__file", "main.vue"]]), iframe_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$4 = {class: "iframe-container"}, _hoisted_2$4 = ["src"], _sfc_main$5 = defineComponent({
    __name: "iframe",
    props: {url: {type: String, default: "http://127.0.0.1:6007"}, type: String},
    setup(e) {
        const t = e, r = ref("");
        if (t.type == "tensorboard") {
            let n = localStorage.getItem("ui-configs");
            if (n) {
                let o = JSON.parse(n);
                o.tensorboard_url ? r.value = o.tensorboard_url : r.value = `${window.location.protocol}//${window.location.host}/proxy/tensorboard/`
            } else r.value = `${window.location.protocol}//${window.location.host}/proxy/tensorboard/`
        } else t.type == "tageditor" ? r.value = `${window.location.protocol}//${window.location.host}/proxy/tageditor/` : r.value = t.url;
        return (n, o) => (openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("iframe", {
            class: "iframe-main",
            src: r.value,
            width: "100%"
        }, null, 8, _hoisted_2$4)]))
    }
});
var IframePage = _export_sfc$1(_sfc_main$5, [["__file", "iframe.vue"]]),
    tagger_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = e => (pushScopeId("data-v-275870d6"), e = e(), popScopeId(), e),
    _hoisted_1$3 = {class: "example-container"}, _hoisted_2$3 = {class: "schema-container"},
    _hoisted_3$3 = {class: "right-container"}, _hoisted_4$3 = {class: "theme-default-content"},
    _hoisted_5$3 = {id: "test-output"},
    _hoisted_6$3 = _withScopeId$2(() => createBaseVNode("header", null, "Output", -1)), _sfc_main$4 = defineComponent({
        __name: "tagger", setup(__props) {
            const frontmatter = usePageFrontmatter(), schema = computed(() => eval(frontmatter.value.code)),
                initial = ref(null), config = ref(null), output = computed(() => {
                    try {
                        return schema.value(config.value)
                    } catch (e) {
                        console.log(e)
                    }
                }), runTrain = () => {
                    const e = schema.value(config.value);
                    e.path = e.path.replaceAll("\\", "/"), fetch("/api/interrogate", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(e)
                    }).then(t => {
                        if (!t.ok) throw new Error("Network response was not ok");
                        return t.json()
                    }).then(t => {
                        console.log(t), t.status == "success" ? ElMessage.success("Tagger \u4EFB\u52A1\u5DF2\u63D0\u4EA4") : ElMessage.error("Tagger \u4EFB\u52A1\u63D0\u4EA4\u5931\u8D25")
                    }).catch(t => {
                        ElMessage.error("\u65E0\u6CD5\u8FDE\u63A5\u5230\u540E\u7AEF"), console.error("There was a problem with the fetch operation:", t)
                    })
                }, reset = () => {
                    config.value = null
                };
            return (e, t) => {
                const r = resolveComponent("k-schema"), n = resolveComponent("el-scrollbar"),
                    o = resolveComponent("content"), a = resolveComponent("el-button"), l = resolveComponent("json");
                return openBlock(), createElementBlock("div", _hoisted_1$3, [createBaseVNode("section", _hoisted_2$3, [createVNode(n, null, {
                    default: withCtx(() => [createBaseVNode("form", null, [
                        createVNode(r, {
                        modelValue: config.value,
                        "onUpdate:modelValue": t[0] || (t[0] = u => config.value = u),
                        initial: initial.value,
                        schema: schema.value
                    }, null, 8, ["modelValue", "initial", "schema"])])]), _: 1
                })]), createBaseVNode("div", _hoisted_3$3, [createBaseVNode("section", _hoisted_4$3, [createVNode(n, null, {
                    default: withCtx(() => [createBaseVNode("main", null, [createVNode(o)])]),
                    _: 1
                })]), createVNode(a, {
                    style: {margin: "10px 20px 0 20px"},
                    onClick: runTrain
                }, {
                    default: withCtx(() => [createTextVNode("\u542F\u52A8")]),
                    _: 1
                }), createVNode(a, {
                    style: {margin: "10px 20px 10px 20px"},
                    onClick: reset
                }, {
                    default: withCtx(() => [createTextVNode("\u5168\u90E8\u91CD\u7F6E")]),
                    _: 1
                }), createBaseVNode("section", _hoisted_5$3, [_hoisted_6$3, createBaseVNode("main", null, [createBaseVNode("code", null, [createVNode(l, {data: output.value}, null, 8, ["data"])])])])])])
            }
        }
    });
var TaggerPage = _export_sfc$1(_sfc_main$4, [["__scopeId", "data-v-275870d6"], ["__file", "tagger.vue"]]);
const _hoisted_1$2 = {key: 0, style: {color: "var(--shiki-token-constant)"}},
    _hoisted_2$2 = {key: 1, style: {color: "var(--shiki-token-string)"}},
    _hoisted_3$2 = {key: 2, style: {color: "var(--shiki-token-constant)"}},
    _hoisted_4$2 = {key: 3, style: {color: "var(--shiki-token-constant)"}},
    _hoisted_5$2 = createBaseVNode("span", {style: {color: "var(--shiki-token-function)"}}, "Date", -1),
    _hoisted_6$2 = createBaseVNode("span", {style: {color: "var(--shiki-token-punctuation)"}}, "(", -1),
    _hoisted_7 = {style: {color: "var(--shiki-token-string)"}},
    _hoisted_8 = createBaseVNode("span", {style: {color: "var(--shiki-token-punctuation)"}}, ")", -1),
    _hoisted_9 = createBaseVNode("span", {style: {color: "var(--shiki-token-punctuation)"}}, "[ ", -1),
    _hoisted_10 = {key: 0, style: {color: "var(--shiki-token-punctuation)"}},
    _hoisted_11 = createBaseVNode("span", {style: {color: "var(--shiki-token-punctuation)"}}, " ]", -1),
    _hoisted_12 = createBaseVNode("span", {style: {color: "var(--shiki-token-punctuation)"}}, "{ ", -1),
    _hoisted_13 = {key: 0, style: {color: "var(--shiki-token-punctuation)"}},
    _hoisted_14 = {style: {color: "var(--shiki-token-parameter)"}},
    _hoisted_15 = createBaseVNode("span", {style: {color: "var(--shiki-token-punctuation)"}}, " }", -1),
    _sfc_main$3 = defineComponent({
        __name: "json", props: {data: {}}, setup(e) {
            function t(r) {
                return r.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")
            }

            return (r, n) => {
                const o = resolveComponent("json", !0);
                return unref(isNullable)(e.data) ? (openBlock(), createElementBlock("span", _hoisted_1$2, "null")) : typeof e.data == "string" ? (openBlock(), createElementBlock("span", _hoisted_2$2, '"' + toDisplayString(t(e.data)) + '"', 1)) : typeof e.data == "number" ? (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString(e.data), 1)) : typeof e.data == "boolean" ? (openBlock(), createElementBlock("span", _hoisted_4$2, toDisplayString(e.data), 1)) : e.data instanceof Date ? (openBlock(), createElementBlock(Fragment, {key: 4}, [_hoisted_5$2, _hoisted_6$2, createBaseVNode("span", _hoisted_7, toDisplayString(e.data.toISOString()), 1), _hoisted_8], 64)) : e.data instanceof Array ? (openBlock(), createElementBlock(Fragment, {key: 5}, [_hoisted_9, (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data, (a, l) => (openBlock(), createElementBlock(Fragment, {key: l}, [l ? (openBlock(), createElementBlock("span", _hoisted_10, ", ")) : createCommentVNode("", !0), createVNode(o, {data: a}, null, 8, ["data"])], 64))), 128)), _hoisted_11], 64)) : (openBlock(), createElementBlock(Fragment, {key: 6}, [_hoisted_12, (openBlock(!0), createElementBlock(Fragment, null, renderList(Object.entries(e.data), ([a, l], u) => (openBlock(), createElementBlock(Fragment, {key: u}, [u ? (openBlock(), createElementBlock("span", _hoisted_13, ", ")) : createCommentVNode("", !0), createBaseVNode("span", _hoisted_14, '"' + toDisplayString(a) + '"', 1), createTextVNode(": "), createVNode(o, {data: l}, null, 8, ["data"])], 64))), 128)), _hoisted_15], 64))
            }
        }
    });
var Json = _export_sfc$1(_sfc_main$3, [["__file", "json.vue"]]),
    settings_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = e => (pushScopeId("data-v-7b48ba30"), e = e(), popScopeId(), e),
    _hoisted_1$1 = {class: "example-container"}, _hoisted_2$1 = {class: "schema-container"},
    _hoisted_3$1 = {class: "right-container"}, _hoisted_4$1 = {class: "theme-default-content"},
    _hoisted_5$1 = {id: "test-output1"},
    _hoisted_6$1 = _withScopeId$1(() => createBaseVNode("header", null, "Output", -1)), _sfc_main$2 = defineComponent({
        __name: "settings", setup(__props) {
            onMounted(() => {
                loadConfigs()
            });
            const frontmatter = usePageFrontmatter(), schema = computed(() => eval(frontmatter.value.code)),
                initial = ref(null), config = ref(null), defaultConfig = {}, output = computed(() => {
                    try {
                        return schema.value(config.value)
                    } catch (e) {
                        console.log(e)
                    }
                }), loadConfigs = () => {
                    let e = localStorage.getItem("ui-configs"), t = defaultConfig;
                    e && (t = JSON.parse(e)), initial.value = clone(t), config.value = clone(t)
                }, saveSettings = () => {
                    localStorage.setItem("ui-configs", JSON.stringify(schema.value(config.value)))
                }, reset = () => {
                    initial.value = clone(defaultConfig), config.value = clone(defaultConfig), saveSettings()
                };
            return (e, t) => {
                const r = resolveComponent("k-schema"), n = resolveComponent("el-scrollbar"),
                    o = resolveComponent("content"), a = resolveComponent("el-button");
                return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("section", _hoisted_2$1, [createVNode(n, null, {
                    default: withCtx(() => [createBaseVNode("form", null, [createVNode(r, {
                        modelValue: config.value,
                        "onUpdate:modelValue": t[0] || (t[0] = l => config.value = l),
                        initial: initial.value,
                        schema: schema.value
                    }, null, 8, ["modelValue", "initial", "schema"])])]), _: 1
                })]), createBaseVNode("div", _hoisted_3$1, [createBaseVNode("section", _hoisted_4$1, [createVNode(n, null, {
                    default: withCtx(() => [createBaseVNode("main", null, [createVNode(o)])]),
                    _: 1
                })]), createBaseVNode("section", _hoisted_5$1, [_hoisted_6$1, createBaseVNode("main", null, [createBaseVNode("code", null, [createVNode(Json, {data: output.value}, null, 8, ["data"])])])]), createVNode(a, {
                    style: {margin: "10px 20px 0 20px"},
                    onClick: saveSettings
                }, {
                    default: withCtx(() => [createTextVNode("\u4FDD\u5B58\u8BBE\u7F6E")]),
                    _: 1
                }), createVNode(a, {
                    style: {margin: "10px 20px 10px 20px"},
                    onClick: reset
                }, {default: withCtx(() => [createTextVNode("\u5168\u90E8\u91CD\u7F6E")]), _: 1})])])
            }
        }
    });
var SettingsPage = _export_sfc$1(_sfc_main$2, [["__scopeId", "data-v-7b48ba30"], ["__file", "settings.vue"]]),
    tools_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = e => (pushScopeId("data-v-d6bf4500"), e = e(), popScopeId(), e),
    _hoisted_1 = {class: "example-container"}, _hoisted_2 = {class: "schema-container"},
    _hoisted_3 = {class: "right-container"}, _hoisted_4 = {class: "theme-default-content"},
    _hoisted_5 = {id: "test-output1"},
    _hoisted_6 = _withScopeId(() => createBaseVNode("header", null, "\u53C2\u6570\u9884\u89C8", -1)),
    _sfc_main$1 = defineComponent({
        __name: "tools", setup(__props) {
            onMounted(() => {
            });
            const frontmatter = usePageFrontmatter(), schema = computed(() => eval(frontmatter.value.code)),
                initial = ref(null), config = ref(null), output = computed(() => {
                    try {
                        return schema.value(config.value)
                    } catch (e) {
                        console.log(e)
                    }
                }), reset = () => {
                    config.value = null
                }, runScript = () => {
                    schema.value(config.value) || ElMessage.warning("\u53C2\u6570\u4E3A\u7A7A"), fetch("http://127.0.0.1:28000/api/run_script", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(schema.value(config.value))
                    }).then(t => {
                        if (!t.ok) throw new Error("Network response was not ok");
                        return t.json()
                    }).then(t => {
                        console.log(t), t.status == "success" ? ElMessage.success("\u4EFB\u52A1\u5DF2\u63D0\u4EA4") : ElMessage.error("\u4EFB\u52A1\u63D0\u4EA4\u5931\u8D25")
                    }).catch(t => {
                        ElMessage.error("\u65E0\u6CD5\u8FDE\u63A5\u5230\u8BAD\u7EC3\u7AEF\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u5F00\u542F\u8BAD\u7EC3\u7AEF\u3002"), console.error("There was a problem with the fetch operation:", t)
                    })
                };
            return (e, t) => {
                const r = resolveComponent("k-schema"), n = resolveComponent("el-scrollbar"),
                    o = resolveComponent("content"), a = resolveComponent("el-button");
                return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("section", _hoisted_2, [createVNode(n, null, {
                    default: withCtx(() => [createBaseVNode("form", null, [createVNode(r, {
                        modelValue: config.value,
                        "onUpdate:modelValue": t[0] || (t[0] = l => config.value = l),
                        initial: initial.value,
                        schema: schema.value
                    }, null, 8, ["modelValue", "initial", "schema"])])]), _: 1
                })]), createBaseVNode("div", _hoisted_3, [createBaseVNode("section", _hoisted_4, [createVNode(n, null, {
                    default: withCtx(() => [createBaseVNode("main", null, [createVNode(o)])]),
                    _: 1
                })]), createBaseVNode("section", _hoisted_5, [_hoisted_6, createBaseVNode("main", null, [createBaseVNode("code", null, [createVNode(Json, {data: output.value}, null, 8, ["data"])])])]), createVNode(a, {
                    style: {margin: "10px 20px 0 20px"},
                    onClick: runScript
                }, {
                    default: withCtx(() => [createTextVNode("\u542F\u52A8")]),
                    _: 1
                }), createVNode(a, {
                    style: {margin: "10px 20px 10px 20px"},
                    onClick: reset
                }, {default: withCtx(() => [createTextVNode("\u5168\u90E8\u91CD\u7F6E")]), _: 1})])])
            }
        }
    });
var ToolsPage = _export_sfc$1(_sfc_main$1, [["__scopeId", "data-v-d6bf4500"], ["__file", "tools.vue"]]);
const SAMPLE_PROMPTS_DEFAULT = "(masterpiece, best quality:1.2), 1girl, solo, --n lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry,  --w 512  --h 512  --l 7  --s 24  --d 1337",
    SAMPLE_PROMPTS_DESCRIPTION = "\u9884\u89C8\u56FE\u751F\u6210\u53C2\u6570\u3002\u53EF\u586B\u5199\u76F4\u63A5\u586B\u5199\u53C2\u6570\uFF0C\u6216\u5355\u72EC\u5199\u5165txt\u6587\u4EF6\u586B\u5199\u8DEF\u5F84<br>`--n` \u540E\u65B9\u4E3A\u53CD\u5411\u63D0\u793A\u8BCD<br>`--w`\u5BBD\uFF0C`--h`\u9AD8<br>`--l`: CFG Scale<br>`--s`: \u8FED\u4EE3\u6B65\u6570<br>`--d`: \u79CD\u5B50";

function loadSharedToWindow() {
    window.__MIKAZUKI__ = {SAMPLE_PROMPTS_DEFAULT, SAMPLE_PROMPTS_DESCRIPTION}
}

const _sfc_main = defineComponent({
    __name: "layout", setup(e) {
        const t = usePageData();
        return onBeforeMount(async () => {
            loadSharedToWindow(), schemaManagerInstance.loadLocalSchema(), await schemaManagerInstance.checkSchemaUpdates() && (ElMessage.warning({
                message: "\u68C0\u6D4B\u5230\u672C\u5730\u6570\u636E\u7ED3\u6784\u6709\u66F4\u65B0\uFF0C\u6B63\u5728\u66F4\u65B0\u672C\u5730\u6570\u636E\u7ED3\u6784\uFF0C\u8BF7\u7A0D\u7B49...",
                duration: 5e3
            }), await schemaManagerInstance.loadServerSchema())
        }), (r, n) => (openBlock(), createBlock(ParentLayout, null, createSlots({_: 2}, [unref(t).frontmatter.example ? {
            name: "page",
            fn: withCtx(() => [(openBlock(), createBlock(MainPage, {key: unref(t).key}))]),
            key: "0"
        } : unref(t).frontmatter.type == "iframe" ? {
            name: "page",
            fn: withCtx(() => [(openBlock(), createBlock(IframePage, {
                key: unref(t).key,
                type: unref(t).frontmatter.subtype
            }, null, 8, ["type"]))]),
            key: "1"
        } : unref(t).frontmatter.type == "tagger" ? {
            name: "page",
            fn: withCtx(() => [(openBlock(), createBlock(TaggerPage, {key: unref(t).key}))]),
            key: "2"
        } : unref(t).frontmatter.type == "settings" ? {
            name: "page",
            fn: withCtx(() => [(openBlock(), createBlock(SettingsPage, {key: unref(t).key}))]),
            key: "3"
        } : unref(t).frontmatter.type == "tools" ? {
            name: "page",
            fn: withCtx(() => [(openBlock(), createBlock(ToolsPage, {key: unref(t).key}))]),
            key: "4"
        } : void 0]), 1024))
    }
});
var layout = _export_sfc$1(_sfc_main, [["__file", "layout.vue"]]);
export {layout as default};
