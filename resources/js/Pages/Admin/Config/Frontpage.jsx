import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminSidebar from '@/Components/AdminSidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const inputDarkClass =
    'mt-1 block w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500';

function deepClone(value) {
    return JSON.parse(JSON.stringify(value ?? {}));
}

function Field({ label, value, onChange, multiline = false, rows = 3 }) {
    return (
        <div>
            <InputLabel value={label} />
            {multiline ? (
                <textarea
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${inputDarkClass}`}
                />
            ) : (
                <TextInput
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputDarkClass}
                />
            )}
        </div>
    );
}

function StringListEditor({ label, items = [], onChange }) {
    return (
        <div className="space-y-2">
            <InputLabel value={label} />
            {items.map((item, index) => (
                <div key={index} className="flex gap-2">
                    <TextInput
                        value={item}
                        onChange={(e) => {
                            const next = [...items];
                            next[index] = e.target.value;
                            onChange(next);
                        }}
                        className={`flex-1 ${inputDarkClass}`}
                    />
                    <button
                        type="button"
                        className="rounded-md border border-gray-300 px-3 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => onChange(items.filter((_, i) => i !== index))}
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
                onClick={() => onChange([...items, ''])}
            >
                + Add item
            </button>
        </div>
    );
}

function TitleBodyListEditor({ label, items = [], onChange, titleKey = 'title', bodyKey = 'body' }) {
    return (
        <div className="space-y-4">
            <InputLabel value={label} />
            {items.map((item, index) => (
                <div key={index} className="space-y-2 rounded-lg border border-gray-200 p-3 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-gray-500">#{index + 1}</span>
                        <button
                            type="button"
                            className="text-sm text-red-600 hover:text-red-700"
                            onClick={() => onChange(items.filter((_, i) => i !== index))}
                        >
                            Remove
                        </button>
                    </div>
                    <Field
                        label={titleKey === 'q' ? 'Question' : 'Title'}
                        value={item[titleKey]}
                        onChange={(value) => {
                            const next = [...items];
                            next[index] = { ...next[index], [titleKey]: value };
                            onChange(next);
                        }}
                    />
                    <Field
                        label={bodyKey === 'a' ? 'Answer' : 'Body'}
                        value={item[bodyKey]}
                        multiline
                        onChange={(value) => {
                            const next = [...items];
                            next[index] = { ...next[index], [bodyKey]: value };
                            onChange(next);
                        }}
                    />
                </div>
            ))}
            <button
                type="button"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
                onClick={() =>
                    onChange([
                        ...items,
                        titleKey === 'q' ? { q: '', a: '' } : { [titleKey]: '', [bodyKey]: '' },
                    ])
                }
            >
                + Add item
            </button>
        </div>
    );
}

function NavItemsEditor({ items = [], onChange }) {
    return (
        <div className="space-y-4">
            <InputLabel value="Quick links / menu options" />
            {items.map((item, index) => (
                <div
                    key={index}
                    className="space-y-2 rounded-lg border border-gray-200 p-3 dark:border-gray-600"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-gray-500">#{index + 1}</span>
                        <button
                            type="button"
                            className="text-sm text-red-600 hover:text-red-700"
                            onClick={() => onChange(items.filter((_, i) => i !== index))}
                        >
                            Remove
                        </button>
                    </div>
                    <Field
                        label="Link (href)"
                        value={item.href}
                        onChange={(value) => {
                            const next = [...items];
                            next[index] = { ...next[index], href: value };
                            onChange(next);
                        }}
                    />
                    <Field
                        label="Label"
                        value={item.label}
                        onChange={(value) => {
                            const next = [...items];
                            next[index] = { ...next[index], label: value };
                            onChange(next);
                        }}
                    />
                </div>
            ))}
            <button
                type="button"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
                onClick={() => onChange([...items, { href: '#', label: '' }])}
            >
                + Add option
            </button>
        </div>
    );
}

function LocaleFields({ sectionKey, localeData, onChange }) {
    const set = (path, value) => {
        const next = deepClone(localeData);
        next[path[0]] = value;
        onChange(next);
    };

    if (!localeData) return null;

    if (sectionKey === 'form' || sectionKey === 'midCta' || sectionKey === 'cta' || sectionKey === 'footer') {
        return (
            <div className="space-y-4">
                {Object.keys(localeData).map((key) => (
                    <Field
                        key={key}
                        label={key}
                        value={localeData[key]}
                        multiline={typeof localeData[key] === 'string' && localeData[key].length > 80}
                        onChange={(value) => set([key], value)}
                    />
                ))}
            </div>
        );
    }

    if (sectionKey === 'hero') {
        return (
            <div className="space-y-4">
                <Field label="Tagline (small caps)" value={localeData.tagline} onChange={(v) => set(['tagline'], v)} />
                <Field label="Title before" value={localeData.titleBefore} onChange={(v) => set(['titleBefore'], v)} />
                <Field label="Title highlight" value={localeData.titleHighlight} onChange={(v) => set(['titleHighlight'], v)} />
                <Field label="Description" value={localeData.description} multiline onChange={(v) => set(['description'], v)} />
                <StringListEditor label="Features" items={localeData.features || []} onChange={(v) => set(['features'], v)} />
            </div>
        );
    }

    if (sectionKey === 'trust' || sectionKey === 'services' || sectionKey === 'whyUs') {
        return (
            <div className="space-y-4">
                {Object.keys(localeData)
                    .filter((key) => key !== 'items')
                    .map((key) => (
                        <Field
                            key={key}
                            label={key}
                            value={localeData[key]}
                            multiline={typeof localeData[key] === 'string' && localeData[key].length > 60}
                            onChange={(v) => set([key], v)}
                        />
                    ))}
                <TitleBodyListEditor
                    label="Items"
                    items={localeData.items || []}
                    onChange={(v) => set(['items'], v)}
                />
            </div>
        );
    }

    if (sectionKey === 'about') {
        return (
            <div className="space-y-4">
                <Field label="Eyebrow" value={localeData.eyebrow} onChange={(v) => set(['eyebrow'], v)} />
                <Field label="Title" value={localeData.title} onChange={(v) => set(['title'], v)} />
                <StringListEditor label="Paragraphs" items={localeData.paragraphs || []} onChange={(v) => set(['paragraphs'], v)} />
                <Field label="CTA" value={localeData.cta} onChange={(v) => set(['cta'], v)} />
                <Field
                    label="Image overlay subtitle template"
                    value={localeData.ownerRole}
                    onChange={(v) => set(['ownerRole'], v)}
                />
            </div>
        );
    }

    if (sectionKey === 'faq') {
        return (
            <div className="space-y-4">
                <Field label="Eyebrow" value={localeData.eyebrow} onChange={(v) => set(['eyebrow'], v)} />
                <Field label="Title" value={localeData.title} onChange={(v) => set(['title'], v)} />
                <Field label="Description" value={localeData.description} multiline onChange={(v) => set(['description'], v)} />
                <TitleBodyListEditor
                    label="Questions"
                    items={localeData.items || []}
                    onChange={(v) => set(['items'], v)}
                    titleKey="q"
                    bodyKey="a"
                />
            </div>
        );
    }

    return (
        <pre className="overflow-auto rounded bg-gray-100 p-3 text-xs dark:bg-gray-900">
            {JSON.stringify(localeData, null, 2)}
        </pre>
    );
}

function MediaUploader({ slots = [] }) {
    const [uploadingSlot, setUploadingSlot] = useState(null);
    const [error, setError] = useState('');

    const onFileChange = (slot, file) => {
        if (!file) return;
        setError('');
        setUploadingSlot(slot);
        const formData = new FormData();
        formData.append('slot', slot);
        formData.append('image', file);
        router.post(route('admin.config.frontpage.media'), formData, {
            forceFormData: true,
            preserveScroll: true,
            onError: (errs) => setError(errs.image || errs.slot || 'Upload failed.'),
            onFinish: () => setUploadingSlot(null),
        });
    };

    if (!slots.length) return null;

    return (
        <div className="space-y-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-900/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Images</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload replaces the current file for that slot (fixed filename).
            </p>
            {slots.map((slot) => (
                <div
                    key={slot.slot}
                    className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800"
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="h-20 w-32 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900">
                            <img
                                src={slot.url}
                                alt={slot.label}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 dark:text-gray-100">{slot.label}</p>
                            <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                                /images/{slot.filename}
                            </p>
                            <label className="mt-2 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                                {uploadingSlot === slot.slot ? 'Uploading…' : 'Choose image'}
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="hidden"
                                    disabled={!!uploadingSlot}
                                    onChange={(e) => {
                                        onFileChange(slot.slot, e.target.files?.[0] ?? null);
                                        e.target.value = '';
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            ))}
            <InputError message={error} />
        </div>
    );
}

function slotsForSection(sectionKey, mediaSlots = []) {
    if (sectionKey === 'hero') {
        return mediaSlots.filter((s) => s.slot === 'hero');
    }
    if (sectionKey === 'about') {
        return mediaSlots.filter((s) => s.slot === 'about');
    }
    if (sectionKey === 'services') {
        return mediaSlots.filter((s) => s.slot.startsWith('service_'));
    }
    return [];
}

function SectionEditor({ section, onClose, mediaSlots = [], business = {}, nav = {} }) {
    const { translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;
    const [tab, setTab] = useState('en');
    const relatedSlots = slotsForSection(section.key, mediaSlots);
    const needsBusiness = section.key === 'about' || section.key === 'footer';
    const needsNav = section.key === 'footer';
    const sectionLabel = t(`admin.config.sections.${section.key}.label`);
    const sectionDescription = t(`admin.config.sections.${section.key}.description`);

    const { data, setData, put, processing, errors, recentlySuccessful, transform } = useForm({
        content: deepClone(section.content),
        business: deepClone(
            needsBusiness
                ? {
                      contactName: business.contactName,
                      email: business.email,
                      phone: business.phone,
                      phoneHref: business.phoneHref,
                      location: business.location,
                      name: business.name,
                  }
                : {},
        ),
        nav: deepClone(needsNav ? nav : {}),
    });

    useEffect(() => {
        setData({
            content: deepClone(section.content),
            business: deepClone(
                needsBusiness
                    ? {
                          contactName: business.contactName,
                          email: business.email,
                          phone: business.phone,
                          phoneHref: business.phoneHref,
                          location: business.location,
                          name: business.name,
                      }
                    : {},
            ),
            nav: deepClone(needsNav ? nav : {}),
        });
        setTab('en');
    }, [section.key]);

    const submit = (e) => {
        e.preventDefault();

        transform((form) => {
            const payload = { content: form.content };

            if (section.key === 'hero') {
                payload.business = {
                    tagline: form.content?.en?.tagline || form.content?.es?.tagline || '',
                };
            } else if (section.key === 'about') {
                payload.business = { contactName: form.business?.contactName };
            } else if (section.key === 'footer') {
                payload.business = {
                    name: form.business?.name,
                    email: form.business?.email,
                    phone: form.business?.phone,
                    phoneHref: form.business?.phoneHref,
                    location: form.business?.location,
                };
                payload.nav = form.nav;
            }

            return payload;
        });

        put(route('admin.config.frontpage.update', section.key), {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    const updateLocale = (localeData) => {
        setData('content', {
            ...data.content,
            [tab]: localeData,
        });
    };

    const updateNavLocale = (localeData) => {
        const other = tab === 'en' ? 'es' : 'en';
        const items = localeData.items || [];
        const otherItems = data.nav?.[other]?.items || [];
        setData('nav', {
            ...data.nav,
            [tab]: localeData,
            [other]: {
                ...(data.nav?.[other] || {}),
                items: items.map((item, index) => ({
                    href: item.href || '#',
                    label: otherItems[index]?.label ?? '',
                })),
            },
        });
    };

    return (
        <form onSubmit={submit} className="flex max-h-[80vh] flex-col">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{sectionLabel}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{sectionDescription}</p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
                <MediaUploader slots={relatedSlots} />

                {section.key === 'about' && (
                    <Field
                        label="Image overlay title (Dispatch)"
                        value={data.business?.contactName}
                        onChange={(value) => setData('business', { ...data.business, contactName: value })}
                    />
                )}

                {section.key === 'footer' && (
                    <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Contact column
                        </p>
                        {['name', 'phone', 'phoneHref', 'email', 'location'].map((key) => (
                            <Field
                                key={key}
                                label={key}
                                value={data.business?.[key]}
                                onChange={(value) =>
                                    setData('business', { ...data.business, [key]: value })
                                }
                            />
                        ))}
                    </div>
                )}

                <div className="flex gap-2">
                    {['en', 'es'].map((locale) => (
                        <button
                            key={locale}
                            type="button"
                            onClick={() => setTab(locale)}
                            className={
                                'rounded-md px-3 py-1.5 text-sm font-semibold uppercase ' +
                                (tab === locale
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200')
                            }
                        >
                            {locale}
                        </button>
                    ))}
                </div>

                <LocaleFields
                    sectionKey={section.key}
                    localeData={data.content?.[tab] || {}}
                    onChange={updateLocale}
                />

                {section.key === 'footer' && (
                    <div className="space-y-4 border-t border-gray-200 pt-4 dark:border-gray-600">
                        <NavItemsEditor
                            items={data.nav?.[tab]?.items || []}
                            onChange={(items) =>
                                updateNavLocale({
                                    ...(data.nav?.[tab] || {}),
                                    items,
                                })
                            }
                        />
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Button labels (nav chrome)
                            </p>
                            {['signIn', 'dashboard', 'openMenu', 'closeMenu'].map((key) => (
                                <div key={key} className="mb-3">
                                    <Field
                                        label={key}
                                        value={data.nav?.[tab]?.[key]}
                                        onChange={(value) =>
                                            updateNavLocale({
                                                ...(data.nav?.[tab] || {}),
                                                [key]: value,
                                            })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <InputError message={errors.content} />
                {recentlySuccessful && <p className="text-sm text-green-600">Saved.</p>}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
                <PrimaryButton disabled={processing}>Save section</PrimaryButton>
            </div>
        </form>
    );
}

export default function FrontpageConfig() {
    const {
        translations = {},
        sections = [],
        mediaSlots = [],
        business = {},
        nav = {},
        flash = {},
    } = usePage().props;
    const t = (key) => translations[key] ?? key;
    const [editing, setEditing] = useState(null);

    return (
        <AuthenticatedLayout
            sidebar={<AdminSidebar />}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                    {t('admin.config.frontpage_title')}
                </h2>
            }
        >
            <Head title={t('admin.config.frontpage_title')} />

            <div className="p-4 sm:p-6">
                <p className="mb-6 max-w-3xl text-sm text-gray-600 dark:text-gray-400">
                    {t('admin.config.frontpage_description')}
                </p>

                {flash.success && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-200">
                        {flash.success}
                    </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {sections.map((section) => (
                        <button
                            key={section.key}
                            type="button"
                            onClick={() => setEditing(section)}
                            className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-500"
                        >
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                                {section.key}
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {t(`admin.config.sections.${section.key}.label`)}
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {t(`admin.config.sections.${section.key}.description`)}
                            </p>
                            <p className="mt-4 text-sm font-medium text-primary-600 dark:text-primary-300">
                                {t('admin.config.edit_section')} →
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <Modal show={!!editing} onClose={() => setEditing(null)} maxWidth="2xl">
                {editing && (
                    <SectionEditor
                        section={editing}
                        mediaSlots={mediaSlots}
                        business={business}
                        nav={nav}
                        onClose={() => setEditing(null)}
                    />
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
