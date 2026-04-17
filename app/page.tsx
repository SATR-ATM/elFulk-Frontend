import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Button>الافتراضي</Button>
            <Button variant="secondary">ثانوي</Button>
            <Button variant="outline">مخطط</Button>
            <Button variant="destructive">حذف</Button>
            <Button variant="ghost">شبح</Button>
            <Button variant="link">رابط</Button>
          </div>
          <div className="font-parents flex flex-wrap items-center gap-3">
            <Button size="sm">صغير</Button>
            <Button className="text-2xl">افتراضي</Button>
            <Button size="lg" className="text-xl italic">
              كبير
            </Button>
            <Button size="icon">x</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
