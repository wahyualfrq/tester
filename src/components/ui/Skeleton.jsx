import React from 'react';

const Skeleton = ({ className }) => (
  <div className={`skeleton rounded-2xl ${className}`} />
);

export const ProjectCardSkeleton = () => (
  <div className="bg-slate-50 dark:bg-dark/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm p-0">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  </div>
);

export const CertificateSkeleton = () => (
    <div className="bg-dark/90 border border-white/10 rounded-2xl overflow-hidden aspect-[3/4] p-0">
        <Skeleton className="h-full w-full rounded-none" />
    </div>
);

export const ProjectDetailSkeleton = () => (
  <div className="bg-white dark:bg-dark min-h-screen">
    <Skeleton className="h-[60vh] md:h-[70vh] w-full rounded-none" />
    <div className="container mx-auto px-4 mt-12 grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12">
        <div>
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="aspect-video w-full" />
        </div>
      </div>
      <div className="p-8 space-y-8">
        <Skeleton className="h-64 w-full rounded-3xl" />
      </div>
    </div>
  </div>
);

export default Skeleton;
