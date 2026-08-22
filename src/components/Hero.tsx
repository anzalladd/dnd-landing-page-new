"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Chip } from "./Chip";
import { InteractiveGrid } from "./InteractiveGrid";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(imageRef.current, { opacity: 0, scale: 0.95 });
      if (textRef.current) gsap.set(gsap.utils.toArray(textRef.current.children), { opacity: 0, y: 30 });
      if (chipsRef.current) gsap.set(gsap.utils.toArray(chipsRef.current.children[0]?.children || []), { opacity: 0, scale: 0 });

      // Animate in sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
      })
        .to(
          gsap.utils.toArray(chipsRef.current?.children?.[0]?.children || []),
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.5)",
          },
          "-=0.6"
        )
        .to(
          gsap.utils.toArray(textRef.current?.children || []),
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center px-4 pt-[120px] pb-10 w-full min-h-screen overflow-hidden"
    >
      {/* Dot Grid Background */}
      <InteractiveGrid />

      <div className="z-10 relative flex flex-col flex-1 items-center w-full max-w-[1440px]">

        {/* Main Illustration Area */}
        <div className="relative flex justify-center items-start mt-4 md:mt-8 w-full h-[500px]">

          <div ref={imageRef} className="z-10 relative w-full max-w-[759px] h-[382px]">
            <Image
              src="/images/hero.png"
              alt="Hero Illustration"
              fill
              sizes="(max-width: 768px) 100vw, 759px"
              className="object-contain"
              priority
            />
          </div>

          {/* Chips */}
          <div ref={chipsRef} className="hidden md:block absolute inset-0 pointer-events-none">
            {/* We enable pointer events only on the chips themselves */}
            <div className="relative w-full h-full pointer-events-none">
              <Chip
                label="/logo-&-brandmark"
                title="Logo & Brandmark"
                description="A distinctive and memorable mark that captures the very essence of your business."
                className="top-[-2%] left-[23%] pointer-events-auto"
                bgHex="#BAAF8B"
                textHex="#121212"
              />
              <Chip
                label="/web-development"
                title="Web Development"
                description="Robust, scalable code and architecture tailored to modern web standards."
                className="top-[-2%] left-[46.5%] pointer-events-auto"
                bgHex="#FA8DD8"
                textHex="#121212"
              />
              <Chip
                label="/visual-identity"
                title="Visual Identity"
                description="A visual language that gives your brand a distinct look across every touchpoint."
                className="top-[17.5%] left-[11.5%] pointer-events-auto"
                bgHex="#AFE877"
                textHex="#00302E"
              />
              <Chip
                label="/no-code-development"
                title="No-code Development"
                description="Fast and flexible builds using powerful no-code platforms for rapid delivery."
                className="top-[17.5%] left-[78%] pointer-events-auto"
                bgHex="#FF814A"
                textHex="#121212"
              />
              <Chip
                label="/interface-design"
                title="Interface Design"
                description="Intuitive and pixel-perfect user experiences crafted with precision."
                className="top-[44%] left-[7%] pointer-events-auto"
                bgHex="#AD8FFF"
                textHex="#121212"
              />
              <Chip
                label="/ecommerce-development"
                title="Ecommerce Development"
                description="Seamless shopping experiences engineered to drive conversions and sales."
                className="top-[44%] left-[79%] pointer-events-auto"
                bgHex="#B3D6D3"
                textHex="#121212"
              />
              <Chip
                label="/typography-system"
                title="Typography System"
                description="Harmonious font pairings and hierarchies that elevate readability and style."
                className="top-[70%] left-[9.5%] pointer-events-auto"
                bgHex="#611FD8"
                textHex="#FFFFFF"
              />
              <Chip
                label="/webGL-development"
                title="WebGL Development"
                description="Immersive 3D web experiences using cutting-edge rendering technologies."
                className="top-[70%] left-[77.5%] pointer-events-auto"
                bgHex="#00302E"
                textHex="#C1F003"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div ref={textRef} className="z-20 relative flex flex-col items-center space-y-6 mt-6 md:mt-12 max-w-[900px] text-center">
          <h1 className="font-serif text-foreground md:text-[48px] text-4xl leading-[1.1] md:leading-[56px] tracking-[-0.01em]">
            Branding, Product Design & Code.<br />
            Under one roof.
          </h1>
          <p className="max-w-[586px] font-sans text-[16px] text-foreground-muted leading-[24px]">
            Jakarta-based, growing internationally. We design the identity, then build what carries it.
          </p>
        </div>

      </div>
    </section>
  );
}
