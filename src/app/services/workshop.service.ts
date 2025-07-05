import { Injectable } from '@angular/core';
import { Workshop } from '../models/workshop.model';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  
  private workshops: Workshop[] = [
    {
      id: '1',
      title: 'ChatGPT Prompt Engineering Masterclass',
      description: 'Lernen Sie, wie Sie ChatGPT optimal nutzen und effektive Prompts erstellen. Von den Grundlagen bis zu fortgeschrittenen Techniken.',
      duration: '2 Tage',
      level: 'Anfänger',
      price: 'ab 599€',
      category: 'Prompt Engineering',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      url: 'http://workshops.de/ki/chatgpt-prompt-engineering',
      provider: 'workshops.de',
      features: [
        'Grundlagen des Prompt Engineering',
        'Praxisübungen mit ChatGPT',
        'Zertifikat nach Abschluss',
        'Kleine Gruppen (max. 25 Teilnehmer)'
      ],
      tags: ['ChatGPT', 'Prompt Engineering', 'KI', 'Praktisch'],
      rating: 4.8,
      reviewCount: 156,
      nextDate: '06.09.2025',
      isFeatured: true,
      isOnline: true,
      language: 'Deutsch'
    },
    {
      id: '2',
      title: 'KI für Manager & Führungskräfte',
      description: 'Verstehen Sie die Möglichkeiten und Grenzen von KI im Unternehmen. Strategische Entscheidungen treffen und KI-Projekte erfolgreich umsetzen.',
      duration: '1 Tag',
      level: 'Anfänger',
      price: 'ab 890€',
      category: 'KI Management',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      url: 'http://workshops.de/ki/ki-manager-training',
      provider: 'workshops.de',
      features: [
        'KI-Grundlagen für Manager',
        'Use Cases im Unternehmen',
        'ROI-Berechnung von KI-Projekten',
        'Keine Programmierkenntnisse erforderlich'
      ],
      tags: ['Management', 'KI-Strategie', 'Führung', 'Business'],
      rating: 4.7,
      reviewCount: 89,
      nextDate: '15.09.2025',
      isFeatured: true,
      isOnline: false,
      language: 'Deutsch'
    },
    {
      id: '3',
      title: 'Deep Learning & Neuronale Netze',
      description: 'Intensive Einführung in Deep Learning mit Python, Keras und TensorFlow. Praktische Anwendungen und GPU-Training.',
      duration: '3 Tage',
      level: 'Fortgeschritten',
      price: 'ab 1.850€',
      category: 'Deep Learning',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
      url: 'http://workshops.de/ki/deep-learning-kurs',
      provider: 'workshops.de',
      features: [
        'Multi-Layer-Perceptron (MLP)',
        'Convolutional Neural Networks (CNN)',
        'GPU-Training in der Cloud',
        'Praktische Übungen mit Python'
      ],
      tags: ['Deep Learning', 'Python', 'TensorFlow', 'Keras', 'GPU'],
      rating: 4.9,
      reviewCount: 124,
      nextDate: '17.09.2025',
      isFeatured: true,
      isOnline: true,
      language: 'Deutsch'
    },
    {
      id: '4',
      title: 'KI in Design & Kreativität',
      description: 'Entdecken Sie die kreative Kraft von KI-Tools wie Midjourney, DALL-E und Stable Diffusion für Design und Marketing.',
      duration: '2 Tage',
      level: 'Anfänger',
      price: 'ab 750€',
      category: 'KI Design',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      url: 'http://workshops.de/ki/ki-design-workshop',
      provider: 'workshops.de',
      features: [
        'Midjourney für Bildgeneration',
        'DALL-E und Stable Diffusion',
        'KI-Tools für Marketing',
        'Praktische Design-Projekte'
      ],
      tags: ['Design', 'Kreativität', 'Midjourney', 'DALL-E', 'Marketing'],
      rating: 4.6,
      reviewCount: 67,
      nextDate: '22.09.2025',
      isFeatured: false,
      isOnline: true,
      language: 'Deutsch'
    },
    {
      id: '5',
      title: 'Natural Language Processing (NLP)',
      description: 'Verarbeitung natürlicher Sprache mit modernen KI-Techniken. Von Textanalyse bis zu Chatbot-Entwicklung.',
      duration: '3 Tage',
      level: 'Fortgeschritten',
      price: 'ab 1.650€',
      category: 'NLP',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      url: 'http://workshops.de/ki/nlp-seminar',
      provider: 'workshops.de',
      features: [
        'Textklassifikation und Sentiment Analysis',
        'Chatbot-Entwicklung',
        'BERT und Transformer-Modelle',
        'Praktische NLP-Projekte'
      ],
      tags: ['NLP', 'Textanalyse', 'Chatbots', 'BERT', 'Transformers'],
      rating: 4.8,
      reviewCount: 45,
      nextDate: '25.09.2025',
      isFeatured: false,
      isOnline: true,
      language: 'Deutsch'
    },
    {
      id: '6',
      title: 'Agentic AI & Automation',
      description: 'Lernen Sie, wie Sie autonome KI-Agenten entwickeln und für komplexe Aufgaben einsetzen.',
      duration: '1 Tag',
      level: 'Experte',
      price: 'ab 450€',
      category: 'KI Agenten',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      url: 'http://workshops.de/ki/agentic-ai-workshop',
      provider: 'workshops.de',
      features: [
        'Autonome KI-Agenten entwickeln',
        'Function Calling und Tool Use',
        'Multi-Agent-Systeme',
        'Praktische Automation-Projekte'
      ],
      tags: ['Agentic AI', 'Automation', 'Multi-Agent', 'Tools'],
      rating: 4.9,
      reviewCount: 23,
      nextDate: '29.09.2025',
      isFeatured: false,
      isOnline: true,
      language: 'Deutsch'
    },
    {
      id: '7',
      title: 'KI-Ethik & Verantwortung',
      description: 'Verstehen Sie die ethischen Herausforderungen von KI und lernen Sie, verantwortungsvolle KI-Systeme zu entwickeln.',
      duration: '1 Tag',
      level: 'Anfänger',
      price: 'ab 490€',
      category: 'KI Ethik',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
      url: 'http://workshops.de/ki/ki-ethik-seminar',
      provider: 'workshops.de',
      features: [
        'Ethische KI-Prinzipien',
        'Bias-Erkennung und -Vermeidung',
        'Transparenz und Erklärbarkeit',
        'Regulatorische Anforderungen'
      ],
      tags: ['Ethik', 'Verantwortung', 'Bias', 'Transparenz', 'Regulierung'],
      rating: 4.7,
      reviewCount: 34,
      nextDate: '03.10.2025',
      isFeatured: false,
      isOnline: false,
      language: 'Deutsch'
    },
    {
      id: '8',
      title: 'Machine Learning Operations (MLOps)',
      description: 'Lernen Sie, wie Sie ML-Modelle in Produktion bringen und skalierbare KI-Systeme aufbauen.',
      duration: '2 Tage',
      level: 'Fortgeschritten',
      price: 'ab 1.200€',
      category: 'MLOps',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
      url: 'http://workshops.de/ki/mlops-training',
      provider: 'workshops.de',
      features: [
        'ML-Modelle in Produktion',
        'Docker und Kubernetes für ML',
        'Monitoring und Wartung',
        'CI/CD für ML-Pipelines'
      ],
      tags: ['MLOps', 'DevOps', 'Docker', 'Kubernetes', 'CI/CD'],
      rating: 4.8,
      reviewCount: 56,
      nextDate: '08.10.2025',
      isFeatured: false,
      isOnline: true,
      language: 'Deutsch'
    }
  ];

  constructor() { }

  getWorkshops(): Workshop[] {
    return this.workshops;
  }

  getFeaturedWorkshops(): Workshop[] {
    return this.workshops.filter(workshop => workshop.isFeatured);
  }

  getWorkshopsByCategory(category: string): Workshop[] {
    return this.workshops.filter(workshop => workshop.category === category);
  }

  getWorkshopsByLevel(level: string): Workshop[] {
    return this.workshops.filter(workshop => workshop.level === level);
  }

  getWorkshopById(id: string): Workshop | undefined {
    return this.workshops.find(workshop => workshop.id === id);
  }

  getCategories(): string[] {
    return [...new Set(this.workshops.map(workshop => workshop.category))];
  }

  searchWorkshops(query: string): Workshop[] {
    const lowercaseQuery = query.toLowerCase();
    return this.workshops.filter(workshop => 
      workshop.title.toLowerCase().includes(lowercaseQuery) ||
      workshop.description.toLowerCase().includes(lowercaseQuery) ||
      workshop.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
}