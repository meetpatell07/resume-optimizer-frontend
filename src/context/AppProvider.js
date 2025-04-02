import React from 'react';
import { EducationProvider } from '../context/EducationContext';
import { AuthProvider } from '../context/AuthProvider';
import { WorkExperienceProvider } from '../context/WorkExperienceContext';
import { SkillProvider } from '../context/SkillContext';
import { ProjectProvider } from '../context/ProjectContext';
import { TechnicalKnowledgeProvider } from '../context/TechnicalKnowledgeContext';
import { VolunteerWorkProvider } from '../context/VolunteerWorkContext';
import { UserProvider } from '../context/UserContext';
import { ProfileProvider } from './ProfileContext';


const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <EducationProvider>
        <WorkExperienceProvider>
          <SkillProvider>
            <ProjectProvider>
              <TechnicalKnowledgeProvider>
                <VolunteerWorkProvider>
                <ProfileProvider>

                  <UserProvider>
                    {children}
                  </UserProvider>
                  
                  </ProfileProvider>
                </VolunteerWorkProvider>
              </TechnicalKnowledgeProvider>
            </ProjectProvider>
          </SkillProvider>
        </WorkExperienceProvider>
      </EducationProvider>
    </AuthProvider>
  );
};

export default AppProvider;
