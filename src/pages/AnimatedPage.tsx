import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';

export type AnimatedPageProps = {
  title:string;
  children?: React.ReactNode
};

export default function AnimatedPage(props: AnimatedPageProps) {
  return (
    <div>
      <Header title={props.title} />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {props.children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}