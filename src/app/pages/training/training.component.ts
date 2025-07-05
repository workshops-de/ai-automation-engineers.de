import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { WorkshopService } from '../../services/workshop.service';
import { Workshop } from '../../models/workshop.model';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              KI-Weiterbildung für Profis
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100">
              Meistern Sie Künstliche Intelligenz mit praxisnahen Workshops von workshops.de
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="http://workshops.de/ki" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Alle Workshops entdecken
              </a>
              <button (click)="scrollToWorkshops()" 
                      class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Workshops ansehen
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div class="p-6">
              <div class="text-3xl font-bold text-blue-600 mb-2">{{ workshopStats().total }}+</div>
              <div class="text-gray-600">KI-Workshops</div>
            </div>
            <div class="p-6">
              <div class="text-3xl font-bold text-blue-600 mb-2">{{ workshopStats().categories }}+</div>
              <div class="text-gray-600">Kategorien</div>
            </div>
            <div class="p-6">
              <div class="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
              <div class="text-gray-600">Ø Bewertung</div>
            </div>
            <div class="p-6">
              <div class="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div class="text-gray-600">Zufriedene Teilnehmer</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Workshops -->
      <section class="py-16 bg-gray-50" id="workshops">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empfohlene KI-Workshops
            </h2>
            <p class="text-xl text-gray-600">
              Unsere beliebtesten Kurse für Ihren Einstieg in die Künstliche Intelligenz
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (workshop of featuredWorkshops(); track workshop.id) {
              <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="relative">
                  <img [src]="workshop.image" 
                       [alt]="workshop.title" 
                       class="w-full h-48 object-cover">
                  <div class="absolute top-4 left-4">
                    <span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                      {{ workshop.level }}
                    </span>
                  </div>
                  @if (workshop.isOnline) {
                    <div class="absolute top-4 right-4">
                      <span class="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                        Online
                      </span>
                    </div>
                  }
                </div>
                
                <div class="p-6">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                      {{ workshop.title }}
                    </h3>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-blue-600">{{ workshop.price }}</div>
                      <div class="text-sm text-gray-500">{{ workshop.duration }}</div>
                    </div>
                  </div>
                  
                  <p class="text-gray-600 mb-4">
                    {{ workshop.description }}
                  </p>
                  
                  <div class="flex items-center mb-4">
                    <div class="flex items-center">
                      @for (star of [1,2,3,4,5]; track star) {
                        <svg class="w-4 h-4 text-yellow-400 fill-current" 
                             viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      }
                      <span class="ml-2 text-sm text-gray-600">
                        {{ workshop.rating }} ({{ workshop.reviewCount }} Bewertungen)
                      </span>
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <div class="text-sm text-gray-600 mb-2">Das lernen Sie:</div>
                    <ul class="space-y-1">
                      @for (feature of workshop.features.slice(0, 3); track feature) {
                        <li class="flex items-center text-sm text-gray-700">
                          <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          {{ feature }}
                        </li>
                      }
                    </ul>
                  </div>
                  
                  <div class="flex flex-wrap gap-2 mb-4">
                    @for (tag of workshop.tags.slice(0, 3); track tag) {
                      <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {{ tag }}
                      </span>
                    }
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <div class="text-sm text-gray-500">
                      Nächster Termin: {{ workshop.nextDate }}
                    </div>
                    <a [href]="workshop.url" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Jetzt buchen
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- All Workshops -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Alle KI-Workshops
            </h2>
            <p class="text-xl text-gray-600">
              Entdecken Sie unser vollständiges Angebot an KI-Weiterbildungen
            </p>
          </div>

          <!-- Category Filter -->
          <div class="flex flex-wrap justify-center gap-3 mb-8">
            <button (click)="selectedCategory.set('all')" 
                    [class]="selectedCategory() === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                    class="px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
              Alle Kategorien
            </button>
            @for (category of categories(); track category) {
              <button (click)="selectedCategory.set(category)" 
                      [class]="selectedCategory() === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                      class="px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                {{ category }}
              </button>
            }
          </div>

          <!-- Workshop Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (workshop of filteredWorkshops(); track workshop.id) {
              <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div class="relative">
                  <img [src]="workshop.image" 
                       [alt]="workshop.title" 
                       class="w-full h-40 object-cover">
                  <div class="absolute top-3 left-3">
                    <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {{ workshop.level }}
                    </span>
                  </div>
                  @if (workshop.isOnline) {
                    <div class="absolute top-3 right-3">
                      <span class="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        Online
                      </span>
                    </div>
                  }
                </div>
                
                <div class="p-5">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-bold text-gray-900">
                      {{ workshop.title }}
                    </h3>
                    <div class="text-right">
                      <div class="text-lg font-bold text-blue-600">{{ workshop.price }}</div>
                      <div class="text-xs text-gray-500">{{ workshop.duration }}</div>
                    </div>
                  </div>
                  
                  <p class="text-gray-600 text-sm mb-3">
                    {{ workshop.description }}
                  </p>
                  
                  <div class="flex items-center mb-3">
                    <div class="flex items-center">
                      @for (star of [1,2,3,4,5]; track star) {
                        <svg class="w-3 h-3 text-yellow-400 fill-current" 
                             viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      }
                      <span class="ml-1 text-xs text-gray-600">
                        {{ workshop.rating }} ({{ workshop.reviewCount }})
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap gap-1 mb-3">
                    @for (tag of workshop.tags.slice(0, 3); track tag) {
                      <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {{ tag }}
                      </span>
                    }
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <div class="text-xs text-gray-500">
                      {{ workshop.nextDate }}
                    </div>
                    <a [href]="workshop.url" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Buchen
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Bereit für Ihre KI-Weiterbildung?
          </h2>
          <p class="text-xl mb-8 text-blue-100">
            Starten Sie noch heute in die Zukunft der Künstlichen Intelligenz
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="http://workshops.de/ki" 
               target="_blank" 
               rel="noopener noreferrer"
               class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Alle Workshops ansehen
            </a>
            <a href="mailto:info@workshops.de" 
               class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Beratung anfragen
            </a>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Häufig gestellte Fragen
            </h2>
            <p class="text-xl text-gray-600">
              Alles was Sie über unsere KI-Workshops wissen müssen
            </p>
          </div>

          <div class="space-y-6">
            @for (faq of faqs(); track faq.question) {
              <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  {{ faq.question }}
                </h3>
                <p class="text-gray-600">
                  {{ faq.answer }}
                </p>
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  `
})
export class TrainingComponent implements OnInit {
  private workshopService = new WorkshopService();
  
  // Signals for reactive state management
  selectedCategory = signal('all');
  workshops = signal<Workshop[]>([]);
  
  // Computed signals for derived state
  featuredWorkshops = computed(() => this.workshopService.getFeaturedWorkshops());
  categories = computed(() => this.workshopService.getCategories());
  
  filteredWorkshops = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.workshops();
    }
    return this.workshops().filter(workshop => workshop.category === category);
  });
  
  workshopStats = computed(() => ({
    total: this.workshops().length,
    categories: this.categories().length
  }));

  faqs = signal([
    {
      question: 'Welche Vorkenntnisse benötige ich für die KI-Workshops?',
      answer: 'Die meisten unserer Workshops sind für Anfänger konzipiert. Spezifische Vorkenntnisse werden in der jeweiligen Kursbeschreibung angegeben. Für technische Workshops wie Deep Learning sind Programmierkenntnisse empfehlenswert.'
    },
    {
      question: 'Erhalte ich ein Zertifikat nach Abschluss?',
      answer: 'Ja, alle Teilnehmer erhalten nach erfolgreichem Abschluss ein detailliertes Zertifikat von workshops.de, das Sie für Ihre berufliche Weiterentwicklung nutzen können.'
    },
    {
      question: 'Sind die Workshops online oder vor Ort?',
      answer: 'Wir bieten sowohl Online- als auch Präsenzworkshops an. Die jeweilige Form ist bei jedem Workshop deutlich gekennzeichnet. Online-Workshops nutzen moderne Videokonferenz-Tools für interaktive Lernerfahrungen.'
    },
    {
      question: 'Wie aktuell sind die Kursinhalte?',
      answer: 'Unsere Kursinhalte werden regelmäßig aktualisiert, um mit den neuesten Entwicklungen im Bereich KI Schritt zu halten. Alle Dozenten sind Experten mit aktueller Praxiserfahrung.'
    },
    {
      question: 'Gibt es Gruppentarife oder Firmenrabatte?',
      answer: 'Ja, wir bieten spezielle Konditionen für Firmenbuchungen und Gruppen. Kontaktieren Sie uns unter info@workshops.de für ein individuelles Angebot.'
    }
  ]);

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.setupSEO();
    this.workshops.set(this.workshopService.getWorkshops());
  }

  private setupSEO() {
    // Title and meta description
    this.title.setTitle('KI-Workshops & Weiterbildung | workshops.de - Künstliche Intelligenz lernen');
    
    this.meta.updateTag({
      name: 'description',
      content: 'Professionelle KI-Weiterbildung bei workshops.de ✓ ChatGPT, Deep Learning, Machine Learning ✓ Zertifizierte Kurse ✓ Über 1000 zufriedene Teilnehmer ✓ Jetzt buchen!'
    });

    // Keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'KI Workshop, Künstliche Intelligenz, ChatGPT Training, Deep Learning, Machine Learning, AI Weiterbildung, Prompt Engineering, workshops.de'
    });

    // Open Graph tags
    this.meta.updateTag({
      property: 'og:title',
      content: 'KI-Workshops & Weiterbildung | workshops.de'
    });
    
    this.meta.updateTag({
      property: 'og:description',
      content: 'Professionelle KI-Weiterbildung bei workshops.de. ChatGPT, Deep Learning, Machine Learning und mehr. Zertifizierte Kurse für Anfänger und Profis.'
    });
    
    this.meta.updateTag({
      property: 'og:type',
      content: 'website'
    });
    
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://workshops.de/ki'
    });

    // Twitter Card
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });
    
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'KI-Workshops & Weiterbildung | workshops.de'
    });
    
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Professionelle KI-Weiterbildung bei workshops.de. ChatGPT, Deep Learning, Machine Learning und mehr.'
    });

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': 'workshops.de',
      'url': 'https://workshops.de/ki',
      'description': 'Professionelle KI-Weiterbildung und Workshops zu Künstlicher Intelligenz',
      'offers': {
        '@type': 'Offer',
        'name': 'KI-Workshops',
        'description': 'Professionelle Weiterbildung in Künstlicher Intelligenz',
        'category': 'Education'
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  scrollToWorkshops() {
    const element = document.getElementById('workshops');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}