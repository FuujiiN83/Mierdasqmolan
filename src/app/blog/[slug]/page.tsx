import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/OptimizedImage';
// Iconos SVG inline para evitar dependencias
import blogData from '@/data/blog.json';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  alt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  readTime: string;
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogData.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogData.find((p: BlogPost) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Entrada no encontrada',
    };
  }

  return {
    title: `${post.title} | Blog MQM Web`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogData.find((p: BlogPost) => p.slug === params.slug);

  if (!post || !post.isPublished) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/categoria/blog" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al blog
          </Link>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg">
          <OptimizedImage
            src={post.featuredImage}
            alt={post.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Etiquetas:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link 
            href="/categoria/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Ver más entradas del blog
          </Link>
        </div>
      </div>
    </div>
  );
}
