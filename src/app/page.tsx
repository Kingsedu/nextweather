'use client'

import Image from "next/image";
import styles from "./page.module.css";
import DataCollection from '../component/DataCollection'
export default function Home() {

    return (
    <div className={styles.outerdiv}>
      <DataCollection />
    </div>
  )
}
