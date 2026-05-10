import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ExperienceDetailPage } from '@/pages/ExperienceDetailPage'
import Layout from '@/Layout'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/experience/:id" element={<ExperienceDetailPage />} />
      </Routes>
    </Layout>
  )
}

export default App
