import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { STATS } from '@/utils/constants';
import { staggerContainer, staggerItem, viewportOnce } from '@/utils/motion';

export function Stats() {
  return (
    <section className="bg-black py-16 text-white lg:py-20">
      <Container>
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.id} variants={staggerItem}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-gradient-qb text-4xl font-extrabold tracking-tight lg:text-5xl">
                {stat.value}
              </dd>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
