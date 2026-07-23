import type { Specialty } from '@/types';
import CardButtonLeftDefensive from '@/assets/images/card/button-left-defensive.svg';
import CardButtonLeftForensic from '@/assets/images/card/button-left-forensic.svg';
import CardButtonLeftOffensive from '@/assets/images/card/button-left-offensive.svg';
import CardButtonLeftRedBlue from '@/assets/images/card/button-left-redblue.svg';
import CardButtonLeft from '@/assets/images/card/button-left.svg';
import DefensiveIcon from '@/assets/unicons/specialty/defensive.svg';
import ForensicIcon from '@/assets/unicons/specialty/forensic.svg';
import OffensiveIcon from '@/assets/unicons/specialty/offensive.svg';
import RedBlueIcon from '@/assets/unicons/specialty/redblue.svg';
import type { FC, ReactNode } from 'react';

export interface Props {
  specialty: Specialty;
}

const ChallengeSpecialty: FC<Props> = ({ specialty }) => {
  const normalizedSpecialty = specialty.toLocaleLowerCase();
  const specialtyImageMap: { [key: string]: ReactNode } = {
    offensive: (
      <div className="button" title="Type of the range - offensive">
        <div className="indicator custom-icon">
          <OffensiveIcon />
        </div>
        <CardButtonLeftOffensive />
      </div>
    ),
    defensive: (
      <div className="button" title="Type of the range - defensive">
        <div className="indicator custom-icon">
          <DefensiveIcon />
        </div>
        <CardButtonLeftDefensive />
      </div>
    ),
    forensic: (
      <div className="button" title="Type of the range - forensic">
        <div className="indicator custom-icon">
          <ForensicIcon />
        </div>
        <CardButtonLeftForensic />
      </div>
    ),
    redblue: (
      <div className="button" title="Type of the range - Red And Blue">
        <div className="indicator custom-icon">
          <RedBlueIcon />
        </div>
        <CardButtonLeftRedBlue />
      </div>
    ),
    none: (
      <div className="button" title="Type of the range - Red And Blue">
        <div className="indicator custom-icon none">?</div>
        <CardButtonLeft />
      </div>
    ),
  };

  return (
    specialtyImageMap[normalizedSpecialty] || (
      <div className="button" title={`Type of the range - ${normalizedSpecialty}`}>
        <div className="caption">{normalizedSpecialty}</div>
        <CardButtonLeft />
      </div>
    )
  );
};

export default ChallengeSpecialty;
