import React from 'react';
import { EducationProvider } from '../contexts/EducationContext';
import { AuthProvider } from '../contexts/AuthProvider';
import { WorkExperienceProvider } from '../contexts/WorkExperienceContext';
import { SkillsProvider } from '../contexts/SkillsContext';
import { ProjectProvider } from '../contexts/ProjectContext';
import { TechnicalKnowledgeProvider } from '../contexts/TechnicalKnowledgeContext';
import { VolunteerWorkProvider } from '../contexts/VolunteerWorkContext';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <EducationProvider>
        <WorkExperienceProvider>
          <SkillsProvider>
            <ProjectProvider>
              <TechnicalKnowledgeProvider>
                <VolunteerWorkProvider>
                  {children}
                </VolunteerWorkProvider>
              </TechnicalKnowledgeProvider>
            </ProjectProvider>
          </SkillsProvider>
        </WorkExperienceProvider>
      </EducationProvider>
    </AuthProvider>
  );
};

export default AppProvider;
