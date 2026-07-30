<?php

namespace App\Support;

class FrontpageDefaults
{
    public static function sections(): array
    {
        return [
            'business' => self::business(),
            'media' => self::media(),
            'nav' => self::nav(),
            'hero' => self::hero(),
            'form' => self::form(),
            'trust' => self::trust(),
            'services' => self::services(),
            'about' => self::about(),
            'whyUs' => self::whyUs(),
            'midCta' => self::midCta(),
            'faq' => self::faq(),
            'cta' => self::cta(),
            'footer' => self::footer(),
        ];
    }

    public static function meta(): array
    {
        return [
            'hero' => [
                'label' => 'Hero',
                'description' => 'Top banner: tagline, headline, description, feature bullets, and background image.',
            ],
            'trust' => [
                'label' => 'Trust bar',
                'description' => 'Three value pillars under the hero (capacity, securement, on-time).',
            ],
            'services' => [
                'label' => 'What we haul',
                'description' => 'Services header and flatbed service cards with images.',
            ],
            'about' => [
                'label' => 'About',
                'description' => 'Company story, CTA, photo, and dispatch overlay.',
            ],
            'whyUs' => [
                'label' => 'Why shippers choose GV',
                'description' => 'Reasons grid — title, description, and feature cards.',
            ],
            'midCta' => [
                'label' => 'Mid CTA banner',
                'description' => 'Centered banner: headline and request-capacity button.',
            ],
            'faq' => [
                'label' => 'FAQ',
                'description' => 'Questions brokers ask — header and accordion items.',
            ],
            'cta' => [
                'label' => 'Final CTA',
                'description' => 'Closing section copy next to the quote form.',
            ],
            'form' => [
                'label' => 'Quote form',
                'description' => 'Request capacity form titles, placeholders, button, and consent.',
            ],
            'footer' => [
                'label' => 'Footer',
                'description' => 'Footer blurb, quick links, focus column labels, and contact info.',
            ],
        ];
    }

    public static function business(): array
    {
        return [
            'name' => 'GV Trucking LLC',
            'tagline' => 'Flatbed freight. Serious capacity.',
            'email' => 'dispatch@gvtruckingllc.com',
            'phone' => '(555) 010-2840',
            'phoneHref' => 'tel:+15550102840',
            'location' => 'United States',
            'contactName' => 'Dispatch',
        ];
    }

    public static function media(): array
    {
        return [
            'heroImage' => '/images/' . self::mediaFilenames()['hero'],
            'aboutImage' => '/images/' . self::mediaFilenames()['about'],
            'serviceImages' => [
                '/images/' . self::mediaFilenames()['service_1'],
                '/images/' . self::mediaFilenames()['service_2'],
                '/images/' . self::mediaFilenames()['service_3'],
            ],
        ];
    }

    /**
     * Fixed public filenames — uploads always overwrite these.
     *
     * @return array<string, string>
     */
    public static function mediaFilenames(): array
    {
        return [
            'hero' => 'frontpage-hero.png',
            'about' => 'frontpage-about.png',
            'service_1' => 'frontpage-service-1.png',
            'service_2' => 'frontpage-service-2.png',
            'service_3' => 'frontpage-service-3.png',
        ];
    }

    public static function nav(): array
    {
        return [
            'en' => [
                'items' => [
                    ['href' => '#home', 'label' => 'Home'],
                    ['href' => '#services', 'label' => 'Services'],
                    ['href' => '#about', 'label' => 'About'],
                    ['href' => '#why', 'label' => 'Why GV'],
                    ['href' => '#faq', 'label' => 'FAQ'],
                    ['href' => '#contact', 'label' => 'Contact'],
                ],
                'signIn' => 'Sign in',
                'dashboard' => 'Dashboard',
                'openMenu' => 'Open menu',
                'closeMenu' => 'Close menu',
            ],
            'es' => [
                'items' => [
                    ['href' => '#home', 'label' => 'Inicio'],
                    ['href' => '#services', 'label' => 'Servicios'],
                    ['href' => '#about', 'label' => 'Nosotros'],
                    ['href' => '#why', 'label' => 'Por qué GV'],
                    ['href' => '#faq', 'label' => 'FAQ'],
                    ['href' => '#contact', 'label' => 'Contacto'],
                ],
                'signIn' => 'Iniciar sesión',
                'dashboard' => 'Panel',
                'openMenu' => 'Abrir menú',
                'closeMenu' => 'Cerrar menú',
            ],
        ];
    }

    public static function hero(): array
    {
        return [
            'en' => [
                'tagline' => 'Flatbed freight. Serious capacity.',
                'titleBefore' => 'Flatbed freight',
                'titleHighlight' => 'you can trust',
                'description' => 'GV Trucking LLC moves secured loads with disciplined operations—so brokers and shippers get a serious carrier ready for the orders they assign.',
                'features' => [
                    'Flatbed-first specialty',
                    'Direct dispatch contact',
                    'Securement standards',
                    'Clear ETAs & updates',
                ],
            ],
            'es' => [
                'tagline' => 'Carga flatbed. Capacidad seria.',
                'titleBefore' => 'Carga flatbed',
                'titleHighlight' => 'en la que confías',
                'description' => 'GV Trucking LLC mueve cargas aseguradas con operación disciplinada—para que brokers y shippers tengan un transportista serio, listo para las órdenes que le asignen.',
                'features' => [
                    'Especialistas en flatbed',
                    'Despacho directo',
                    'Estándares de amarre',
                    'ETAs y actualizaciones claras',
                ],
            ],
        ];
    }

    public static function form(): array
    {
        return [
            'en' => [
                'eyebrow' => 'Request capacity',
                'title' => 'Tell us about the load',
                'fullName' => 'Full name',
                'phone' => 'Phone',
                'email' => 'Email',
                'origin' => 'Origin city / state',
                'destination' => 'Destination city / state',
                'message' => 'Commodity, dimensions, pickup window…',
                'submit' => 'Send request',
                'consent' => 'We use this information only to respond about capacity and scheduling.',
                'successTitle' => 'Request received',
                'successBody' => 'Thanks—dispatch will follow up shortly. For urgent loads, call us directly.',
            ],
            'es' => [
                'eyebrow' => 'Solicitar capacidad',
                'title' => 'Cuéntanos sobre la carga',
                'fullName' => 'Nombre completo',
                'phone' => 'Teléfono',
                'email' => 'Correo',
                'origin' => 'Ciudad / estado de origen',
                'destination' => 'Ciudad / estado de destino',
                'message' => 'Mercancía, dimensiones, ventana de recolección…',
                'submit' => 'Enviar solicitud',
                'consent' => 'Usamos esta información solo para responder sobre capacidad y programación.',
                'successTitle' => 'Solicitud recibida',
                'successBody' => 'Gracias—despacho te contactará pronto. Para cargas urgentes, llámanos directamente.',
            ],
        ];
    }

    public static function trust(): array
    {
        return [
            'en' => [
                'cta' => 'Request capacity',
                'items' => [
                    ['title' => 'Reliable capacity', 'body' => 'When we accept an order, we plan the run and follow through—no overbooking.'],
                    ['title' => 'Secure handling', 'body' => 'Proper straps, chains, and checks so open-deck freight stays protected.'],
                    ['title' => 'On-time focus', 'body' => 'Clear ETAs and proactive updates from people who know the truck and the route.'],
                ],
            ],
            'es' => [
                'cta' => 'Solicitar capacidad',
                'items' => [
                    ['title' => 'Capacidad confiable', 'body' => 'Cuando aceptamos una orden, planificamos el viaje y lo cumplimos—sin sobrecupo.'],
                    ['title' => 'Manejo seguro', 'body' => 'Correas, cadenas y revisiones para que la carga abierta viaje protegida.'],
                    ['title' => 'Enfoque a tiempo', 'body' => 'ETAs claros y actualizaciones de quien conoce el camión y la ruta.'],
                ],
            ],
        ];
    }

    public static function services(): array
    {
        return [
            'en' => [
                'eyebrow' => 'What we haul',
                'title' => 'Flatbed-first freight',
                'description' => 'Open-deck specialty for shippers and brokers who need careful securement and accountable capacity.',
                'details' => 'Request capacity',
                'items' => [
                    ['title' => 'Flatbed loads', 'body' => 'Equipment, steel, building materials, and other open-deck freight that needs space and securement.'],
                    ['title' => 'Regional & long-haul', 'body' => 'Planned lanes with disciplined communication from pickup through delivery.'],
                    ['title' => 'Dedicated attention', 'body' => 'A focused two-truck operation means your load is not lost in a massive network.'],
                ],
            ],
            'es' => [
                'eyebrow' => 'Qué transportamos',
                'title' => 'Flete flatbed primero',
                'description' => 'Especialidad en plataforma abierta para shippers y brokers que necesitan amarre cuidadoso y capacidad responsable.',
                'details' => 'Solicitar capacidad',
                'items' => [
                    ['title' => 'Cargas flatbed', 'body' => 'Equipo, acero, materiales de construcción y otra carga abierta que necesita espacio y amarre.'],
                    ['title' => 'Regional y larga distancia', 'body' => 'Rutas planificadas con comunicación disciplinada de origen a destino.'],
                    ['title' => 'Atención dedicada', 'body' => 'Una operación de dos camiones significa que tu carga no se pierde en una red enorme.'],
                ],
            ],
        ];
    }

    public static function about(): array
    {
        return [
            'en' => [
                'eyebrow' => 'About GV Trucking',
                'title' => 'A serious carrier with a clear focus',
                'paragraphs' => [
                    'GV Trucking LLC is built around flatbed freight and professional securement—not every trailer type under the sun.',
                    'With two trucks on the road, we stay close to every load: planning, communication, and delivery standards that protect your freight and your reputation.',
                ],
                'cta' => 'Talk to dispatch',
                'ownerRole' => 'Dispatch · {location}',
            ],
            'es' => [
                'eyebrow' => 'Sobre GV Trucking',
                'title' => 'Un transportista serio con foco claro',
                'paragraphs' => [
                    'GV Trucking LLC está construida alrededor de carga flatbed y amarre profesional—no de todos los tipos de remolque.',
                    'Con dos camiones en la vía, nos mantenemos cerca de cada carga: planificación, comunicación y estándares que protegen tu flete y tu reputación.',
                ],
                'cta' => 'Hablar con despacho',
                'ownerRole' => 'Despacho · {location}',
            ],
        ];
    }

    public static function whyUs(): array
    {
        return [
            'en' => [
                'eyebrow' => 'Why shippers choose GV',
                'title' => 'Small fleet. Serious standards.',
                'description' => 'You get hands-on capacity from a carrier that treats assigned orders as commitments—not volume to chase.',
                'items' => [
                    ['title' => 'Accountable capacity', 'body' => 'We only take what we can move well.'],
                    ['title' => 'Securement discipline', 'body' => 'Open-deck freight done the right way.'],
                    ['title' => 'Direct communication', 'body' => 'Talk to people who know the status.'],
                    ['title' => 'Broker-ready', 'body' => 'Clear answers on equipment, timing, and coverage.'],
                    ['title' => 'Protect your freight', 'body' => 'Careful handling from yard to destination.'],
                    ['title' => 'No runaround', 'body' => 'Straightforward dispatch without layers of delay.'],
                ],
            ],
            'es' => [
                'eyebrow' => 'Por qué eligen GV',
                'title' => 'Flota pequeña. Estándares serios.',
                'description' => 'Obtienes capacidad con atención directa de un transportista que trata las órdenes asignadas como compromisos.',
                'items' => [
                    ['title' => 'Capacidad responsable', 'body' => 'Solo tomamos lo que podemos mover bien.'],
                    ['title' => 'Disciplina de amarre', 'body' => 'Carga abierta hecha como debe ser.'],
                    ['title' => 'Comunicación directa', 'body' => 'Hablas con quien conoce el estado.'],
                    ['title' => 'Listos para brokers', 'body' => 'Respuestas claras de equipo, tiempos y cobertura.'],
                    ['title' => 'Protege tu flete', 'body' => 'Manejo cuidadoso del patio al destino.'],
                    ['title' => 'Sin rodeos', 'body' => 'Despacho directo, sin capas de demora.'],
                ],
            ],
        ];
    }

    public static function midCta(): array
    {
        return [
            'en' => [
                'title' => 'Need flatbed capacity this week?',
                'button' => 'Request capacity',
            ],
            'es' => [
                'title' => '¿Necesitas capacidad flatbed esta semana?',
                'button' => 'Solicitar capacidad',
            ],
        ];
    }

    public static function faq(): array
    {
        return [
            'en' => [
                'eyebrow' => 'FAQ',
                'title' => 'Questions brokers ask',
                'description' => 'Straight answers so you can assign with confidence.',
                'items' => [
                    ['q' => 'What equipment do you run?', 'a' => 'We specialize in flatbed. Tell us dimensions, weight, and commodity so we can confirm fit and securement needs.'],
                    ['q' => 'How do I request capacity?', 'a' => 'Use the form on this page or email dispatch with origin, destination, commodity, and pickup window. We respond as quickly as possible.'],
                    ['q' => 'Do you take brokered freight?', 'a' => 'Yes. We work with brokers and shippers who need a reliable flatbed partner for assigned loads.'],
                    ['q' => 'How is communication handled?', 'a' => 'Direct dispatch contact—status updates from people who know the truck, the route, and the load.'],
                ],
            ],
            'es' => [
                'eyebrow' => 'FAQ',
                'title' => 'Preguntas de brokers',
                'description' => 'Respuestas directas para asignar con confianza.',
                'items' => [
                    ['q' => '¿Qué equipo operan?', 'a' => 'Nos especializamos en flatbed. Indica dimensiones, peso y mercancía para confirmar aptitud y amarre.'],
                    ['q' => '¿Cómo solicito capacidad?', 'a' => 'Usa el formulario de esta página o escribe a despacho con origen, destino, mercancía y ventana de recolección.'],
                    ['q' => '¿Toman flete de brokers?', 'a' => 'Sí. Trabajamos con brokers y shippers que necesitan un socio flatbed confiable para cargas asignadas.'],
                    ['q' => '¿Cómo manejan la comunicación?', 'a' => 'Contacto directo con despacho—actualizaciones de quien conoce el camión, la ruta y la carga.'],
                ],
            ],
        ];
    }

    public static function cta(): array
    {
        return [
            'en' => [
                'eyebrow' => 'Ready when you are',
                'title' => 'Assign the next load with confidence',
                'description' => 'Share the details. We will confirm capacity, timing, and next steps—so you know you have a serious carrier on the order.',
            ],
            'es' => [
                'eyebrow' => 'Listos cuando tú lo estés',
                'title' => 'Asigna la próxima carga con confianza',
                'description' => 'Comparte los detalles. Confirmamos capacidad, tiempos y siguientes pasos—para que sepas que tienes un transportista serio en la orden.',
            ],
        ];
    }

    public static function footer(): array
    {
        return [
            'en' => [
                'blurb' => 'Flatbed freight with disciplined operations for shippers and brokers who need capacity they can trust.',
                'quickLinks' => 'Quick links',
                'topServices' => 'Focus',
                'contact' => 'Contact',
                'privacy' => 'Privacy',
                'terms' => 'Terms',
                'rights' => '© {year} {name}. All rights reserved.',
            ],
            'es' => [
                'blurb' => 'Carga flatbed con operación disciplinada para shippers y brokers que necesitan capacidad confiable.',
                'quickLinks' => 'Enlaces',
                'topServices' => 'Enfoque',
                'contact' => 'Contacto',
                'privacy' => 'Privacidad',
                'terms' => 'Términos',
                'rights' => '© {year} {name}. Todos los derechos reservados.',
            ],
        ];
    }
}
