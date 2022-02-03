import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HealthRecordService} from "../../services/health-record.service";
import {UserService} from "../../services/user.service";
import {DoctorService} from "../../services/doctor.service";
import {HealthRecord} from "../../objects/health-record.config";
import {Doctor} from "../../objects/user.config";
import {AssignedDiagnosis, Diagnosis} from "../../objects/diagnosis.config";
import {MatTable} from "@angular/material/table";
import {Observable} from 'rxjs';
import {DiagnosisService} from "../../services/diagnosis.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-new-health-record',
  templateUrl: './new-health-record.component.html',
  styleUrls: ['./new-health-record.component.scss']
})
export class NewHealthRecordComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() patientCode: string;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  value: any = null;
  localizationToBe: string = '';

  doctor: Doctor;
  assignedDiagnosis: AssignedDiagnosis[] = [];
  filteredOptions: Observable<string[]>;
  diagnosis: Diagnosis[] = [];
  displayedColumns = ['code', 'localization', 'diagnosisName'];
  filteredDiagnosis: Diagnosis[] = this.diagnosis;

  reportForm = this.fb.group({
    name: [null, Validators.required],
    report: [null, Validators.required]
  });
  name: string;
  report: string;

  constructor(private fb: FormBuilder,
              private recordService: HealthRecordService,
              private userService: AuthService,
              private doctorService: DoctorService,
              private diagnosisService: DiagnosisService) { }

  ngOnInit(): void {
    this.loadDiagnosis();
    this.loadDoctor();
  }

  confirm() {
    for (const i in this.reportForm.controls) {
      this.reportForm.controls[i].markAsDirty();
    }
    const newRecord : HealthRecord = {
      patientCode: this.patientCode,
      date: new Date(),
      title: this.reportForm.get('name')?.value,
      doctor: this.doctor,
      report: this.reportForm.get('report')?.value
    };

    if (this.assignedDiagnosis.length > 0) {
      newRecord['diagnosis'] = this.assignedDiagnosis;
    }

    this.recordService.addNewRecord(newRecord).subscribe(
      (data: any) => {
        this.close.emit(true);
      }
    );
  }

  addNewDiagnosis() {
    const newDiagnosis: AssignedDiagnosis = {
      localization: this.localizationToBe,
      diagnosis: this.value
    };
    this.assignedDiagnosis.push(newDiagnosis);
    this.value = null;
    this.localizationToBe = '';
    this.table.renderRows();
  }

  filterArray(event : string) {
    this.filteredDiagnosis = [];
    this.diagnosis.forEach(value => {
      if (value.code.toLowerCase().includes(event.toLowerCase()) ||
          value.name.toLowerCase().includes(event.toLowerCase())) {
        this.filteredDiagnosis.push(value);
      }});
  }

  private loadDiagnosis() {
      this.diagnosisService.getAllDiagnosis().subscribe((next: Diagnosis[]) => {
        this.diagnosis = next;
        this.filteredDiagnosis = next;
      });
  }

  private loadDoctor() {
    this.doctorService.getDoctorByPersonalNumber(this.userService.getLoggedUser().personalNumber)
      .subscribe(
        (data: Doctor) => {
          this.doctor = data;
        }
      )
  }

}

const DIAG: Diagnosis[] = [
  {
    code: 'A00',
    name: 'Cholera'
  },
  {
    code: 'A01',
    name: 'Brušný týfus a paratýfusy'
  },
  {
    code: 'A02',
    name: 'Iné infekcie salmonelami'
  },
  {
    code: 'A03',
    name: 'Bacilová červienka (dyzentéria) – šigelóza'
  },
  {
    code: 'A04',
    name: 'Iné bakteriálne črevné infekcie'
  },
  {
    code: 'A05',
    name: 'Iné bakteriálne otravy potravinami'
  },
  {
    code: 'A06',
    name: 'Amébová červienka – amebóza'
  },
  {
    code: 'A07',
    name: 'Iné protozoárne črevné choroby'
  },
  {
    code: 'A08',
    name: 'Vírusové a inými organizmami vyvolané črevné infekcie'
  },
  {
    code: 'A09',
    name: 'Hnačka a gastroenteritída pravdepodobne infekčného pôvodu'
  },
  {
    code: 'A68',
    name: 'Návratné horúčky'
  },
  {
    code: 'A69',
    name: 'Iné spirochétové infekcie'
  },
  {
    code: 'A70',
    name: 'Infekcie Chlamydia psittaci'
  },
  {
    code: 'A71',
    name: 'Trachóm'
  },
  {
    code: 'A74',
    name: 'Iné choroby vyvolané chlamýdiami'
  },
  {
    code: 'A75',
    name: 'Škvrnitý týfus – typhus exanthematicus'
  },
  {
    code: 'A77',
    name: 'Škvrnité horúčky [riketsiózy prenášané kliešťami]'
  },
  {
    code: 'A78',
    name: 'Q horúčka'
  },
  {
    code: 'A79',
    name: 'Iné riketsiózy'
  },
  {
    code: 'A80',
    name: 'Akútna poliomyelitída'
  },
  {
    code: 'A81',
    name: 'Pomalé vírusové infekcie centrálneho nervového systému'
  },
  {
    code: 'A82',
    name: 'Besnota – rabies, lyssa'
  },
  {
    code: 'A83',
    name: 'Vírusové encefalitídy prenášané komármi'
  },
  {
    code: 'A84',
    name: 'Vírusová encefalitída prenášaná kliešťami'
  },
  {
    code: 'A85',
    name: 'Iné vírusové encefalitídy nezatriedené inde'
  },
  {
    code: 'A86',
    name: 'Nešpecifikované vírusové encefalitídy'
  },
  {
    code: 'A87',
    name: 'Vírusová meningitída'
  },
  {
    code: 'A88',
    name: 'Iné vírusové infekcie centrálneho nervového systému nezatriedené inde'
  },
  {
    code: 'A89',
    name: 'Nešpecifikované vírusové infekcie centrálneho nervového systému'
  },
  {
    code: 'A90',
    name: 'Horúčka dengue [klasická dengue]'
  },
  {
    code: 'A91',
    name: 'Hemoragická horúčka dengue'
  },
  {
    code: 'A92',
    name: 'Iné vírusové horúčky prenášané komármi'
  },
  {
    code: 'A93',
    name: 'Iné vírusové horúčky prenášané článkonožcami nezatriedené inde'
  },
  {
    code: 'A94',
    name: 'Nešpecifikované vírusové horúčky prenášané článkonožcami'
  },
  {
    code: 'A95',
    name: 'Žltá zimnica'
  },
  {
    code: 'A96',
    name: 'Arenavírusová hemoragická horúčka'
  },
  {
    code: 'A98',
    name: 'Iné vírusové hemoragické horúčky nezatriedené inde'
  },
  {
    code: 'A99',
    name: 'Nešpecifikované vírusové hemoragické horúčky'
  },
  {
    code: 'B00',
    name: 'Infekcie herpesovým vírusom [herpes simplex – plazivec jednoduchý]'
  },
  {
    code: 'B01',
    name: 'Ovčie kiahne [varicella]'
  },
  {
    code: 'B02',
    name: 'Zoster – [herpes zoster] – opasec – plazivec pásavý'
  },
  {
    code: 'B03',
    name: 'Kiahne – variola'
  },
  {
    code: 'B04',
    name: 'Opičie kiahne'
  },
  {
    code: 'B05',
    name: 'Osýpky – morbilli'
  },
  {
    code: 'B06',
    name: 'Ružienka [rubeola]'
  },
  {
    code: 'B07',
    name: 'Vírusové bradavice – verruca'
  },
  {
    code: 'B08',
    name: 'Iné vírusové infekcie, charakterizované léziami kože a sliznice nezatriedené inde'
  },
  {
    code: 'B09',
    name: 'Nešpecifikované vírusové infekcie charakterizované léziami kože a sliznice'
  },
  {
    code: 'B15',
    name: 'Akútna hepatitída A'
  },
  {
    code: 'B16',
    name: 'Akútna hepatitída B'
  },
  {
    code: 'B17',
    name: 'Iné akútne vírusové hepatitídy'
  },
  {
    code: 'B18',
    name: 'Chronická vírusová hepatitída'
  },
  {
    code: 'B19',
    name: 'Nešpecifikovaná vírusová hepatitída'
  },
  {
    code: 'B20',
    name: 'Choroba vyvolaná vírusom ľudskej imunitnej nedostatočnosti [HIV] s následnými infekčnými a parazitárnymi chorobami'
  },
  {
    code: 'B21',
    name: 'Choroba vyvolaná vírusom ľudskej imunitnej nedostatočnosti [HIV] vyúsťujúca do zhubných nádorov'
  },
  {
    code: 'B22',
    name: 'Choroba vyvolaná vírusom ľudskej imunitnej nedostatočnosti [HIV] vyúsťujúca do iných špecifikovaných chorôb'
  },
  {
    code: 'B23',
    name: 'Choroba vyvolaná vírusom ľudskej imunitnej nedostatočnosti [HIV] vyúsťujúca do iných chorôb'
  },
  {
    code: 'B24',
    name: 'Nešpecifikovaná choroba vyvolaná vírusom ľudskej imunitnej nedostatočnosti [HIV]'
  },
  {
    code: 'B25',
    name: 'Cytomegalovírusová choroba'
  },
  {
    code: 'B26',
    name: 'Mumps – parotitis epidemica'
  },
  {
    code: 'B27',
    name: 'Infekčná mononukleóza'
  },
  {
    code: 'B30',
    name: 'Vírusový zápal spojoviek – conjunctivitis virosa'
  },
  {
    code: 'B33',
    name: 'Iné vírusové choroby nezatriedené inde'
  },
  {
    code: 'B34',
    name: 'Vírusová infekcia bez miestneho špecifikovania'
  },
  {
    code: 'B35',
    name: 'Dermatofytóza'
  },
  {
    code: 'B36',
    name: 'Iné povrchové mykózy'
  },
  {
    code: 'B37',
    name: 'Kandidóza'
  },
  {
    code: 'B38',
    name: 'Kokcidioidomykóza'
  },
  {
    code: 'B39',
    name: 'Histoplazmóza'
  },
  {
    code: 'B40',
    name: 'Blastomykóza'
  },
  {
    code: 'B41',
    name: 'Parakokcidioidomykóza'
  },
  {
    code: 'B42',
    name: 'Sporotrichóza'
  },
  {
    code: 'B43',
    name: 'Chromomykóza a feomykotický absces'
  },
  {
    code: 'B44',
    name: 'Aspergilóza'
  },
  {
    code: 'B45',
    name: 'Kryptokokóza'
  },
  {
    code: 'B46',
    name: 'Zygomykóza'
  },
  {
    code: 'B47',
    name: 'Mycetóm'
  },
  {
    code: 'B48',
    name: 'Iné mykózy nezatriedené inde'
  },
  {
    code: 'B49',
    name: 'Nešpecifikované mykózy'
  },
  {
    code: 'B50',
    name: 'Malária zavinená Plasmodium falciparum'
  },
  {
    code: 'B51',
    name: 'Malária zavinená Plasmodium vivax'
  },
  {
    code: 'B52',
    name: 'Malária zavinená Plasmodium malariae'
  },
  {
    code: 'B53',
    name: 'Iná parazitologicky potvrdená malária'
  },
  {
    code: 'B54',
    name: 'Nešpecifikovaná malária'
  },
  {
    code: 'B55',
    name: 'Leišmanióza'
  },
  {
    code: 'B56',
    name: 'Africká trypanosomóza'
  },
  {
    code: 'B57',
    name: 'Chagasova choroba'
  },
  {
    code: 'B58',
    name: 'Toxoplazmóza'
  },
  {
    code: 'B59',
    name: 'Pneumocystóza'
  },
  {
    code: 'B60',
    name: 'Iné protozoárne choroby nezatriedené inde'
  },
  {
    code: 'B64',
    name: 'Nešpecifikovaná protozoárna choroba'
  },
  {
    code: 'B65',
    name: 'Schistosomóza [bilharzióza]'
  },
  {
    code: 'B66',
    name: 'Iná trematodóza'
  },
  {
    code: 'B67',
    name: 'Echinokokóza – hydatidóza'
  },
  {
    code: 'B68',
    name: 'Tenióza'
  },
  {
    code: 'B69',
    name: 'Cysticerkóza'
  },
  {
    code: 'B70',
    name: 'Difylobotrióza a sparganóza'
  },
  {
    code: 'B71',
    name: 'Iné infekcie plochými červami (cestódami)'
  },
  {
    code: 'B72',
    name: 'Drakunkulóza'
  },
  {
    code: 'B73',
    name: 'Onchocerkóza'
  },
  {
    code: 'B74',
    name: 'Filariózy'
  },
  {
    code: 'B75',
    name: 'Trichinelóza'
  },
  {
    code: 'B76',
    name: 'Ankylostomóza a nekatorióza'
  },
  {
    code: 'B77',
    name: 'Askarióza'
  },
  {
    code: 'B78',
    name: 'Strongyloidóza'
  },
  {
    code: 'B79',
    name: 'Trichurióza'
  },
  {
    code: 'B80',
    name: 'Enterobióza – mrle'
  },
  {
    code: 'B81',
    name: 'Iné črevné helmintózy nezatriedené inde'
  },
  {
    code: 'B82',
    name: 'Nešpecifikovaný črevný parazitizmus'
  },
  {
    code: 'B83',
    name: 'Iné helmintózy'
  },
  {
    code: 'B85',
    name: 'Zavšivenie – pedikulóza a ftiriáza'
  },
  {
    code: 'B86',
    name: 'Svrab – scabies'
  },
  {
    code: 'B87',
    name: 'Myióza'
  },
  {
    code: 'B88',
    name: 'Iné zamorenia (infestácie)'
  },
  {
    code: 'B89',
    name: 'Nešpecifikovaná parazitárna choroba'
  },
  {
    code: 'B90',
    name: 'Neskoré následky tuberkulózy'
  },
  {
    code: 'B91',
    name: 'Neskoré následky poliomyelitídy'
  },
  {
    code: 'B92',
    name: 'Neskoré následky lepry'
  },
  {
    code: 'B94',
    name: 'Neskoré následky iných a nešpecifikovaných infekčných a parazitárnych chorôb'
  },
  {
    code: 'B95',
    name: 'Streptokoky a stafylokoky ako príčiny chorôb zatriedených v iných kapitolách'
  },
  {
    code: 'B96',
    name: 'Iné baktériové agensy ako príčiny chorôb zatriedených v iných kapitolách'
  },
  {
    code: 'B97',
    name: 'Vírusové agensy ako príčiny chorôb zatriedených v iných kapitolách'
  },
  {
    code: 'B99',
    name: 'Iné a nešpecifikované infekčné choroby'
  },
  {
    code: 'C00',
    name: 'Zhubný nádor pery'
  },
  {
    code: 'C01',
    name: 'Zhubný nádor koreňa jazyka'
  },
  {
    code: 'C02',
    name: 'Zhubný nádor iných a nešpecifikovaných častí jazyka'
  },
  {
    code: 'C03',
    name: 'Zhubný nádor ďasna'
  },
  {
    code: 'C04',
    name: 'Zhubný nádor ústnej spodiny'
  },
  {
    code: 'C05',
    name: 'Zhubný nádor podnebia'
  },
  {
    code: 'C06',
    name: 'Zhubný nádor iných nešpecifikovaných častí úst'
  },
  {
    code: 'C07',
    name: 'Zhubný nádor príušnej žľazy'
  },
  {
    code: 'C08',
    name: 'Zhubný nádor iných a nešpecifikovaných veľkých slinných žliaz'
  },
  {
    code: 'C09',
    name: 'Zhubný nádor mandlí'
  },
  {
    code: 'C10',
    name: 'Zhubný nádor ústnej časti hltana (orofaryngu)'
  },
  {
    code: 'C11',
    name: 'Zhubný nádor nosohltana (nazofaryngu)'
  },
  {
    code: 'C12',
    name: 'Zhubný nádor hruškovitého zálivu (sinus piriformis)'
  },
  {
    code: 'C13',
    name: 'Zhubný nádor hrtanovej časti hltana (hypofaryngu)'
  },
  {
    code: 'C14',
    name: 'Zhubný nádor iných a nepresne určených lokalizácií v oblasti pery, ústnej dutiny a hltana'
  },
  {
    code: 'C15',
    name: 'Zhubný nádor pažeráka'
  },
  {
    code: 'C16',
    name: 'Zhubný nádor žalúdka'
  },
  {
    code: 'C17',
    name: 'Zhubný nádor tenkého čreva'
  },
  {
    code: 'C18',
    name: 'Zhubný nádor hrubého čreva'
  },
  {
    code: 'C19',
    name: 'Zhubný nádor rektosigmoidového spojenia'
  },
  {
    code: 'C20',
    name: 'Zhubný nádor konečníka'
  },
  {
    code: 'C21',
    name: 'Zhubný nádor anusu a análneho kanála'
  },
  {
    code: 'C22',
    name: 'Zhubný nádor pečene a vnútropečeňových žlčových ciest'
  },
  {
    code: 'C23',
    name: 'Zhubný nádor žlčníka'
  },
  {
    code: 'C24',
    name: 'Zhubný nádor iných a nešpecifikovaných častí žlčových vývodov'
  },
  {
    code: 'C25',
    name: 'Zhubný nádor podžalúdkovej žľazy'
  },
  {
    code: 'C26',
    name: 'Zhubný nádor iných a nepresne určených častí tráviacich orgánov'
  },
  {
    code: 'C30',
    name: 'Zhubný nádor nosovej dutiny a stredného ucha'
  },
  {
    code: 'C31',
    name: 'Zhubný nádor prinosových dutín'
  },
  {
    code: 'C32',
    name: 'Zhubný nádor hrtana'
  },
  {
    code: 'C33',
    name: 'Zhubný nádor priedušnice'
  },
  {
    code: 'C34',
    name: 'Zhubný nádor priedušiek a pľúc'
  },
  {
    code: 'C37',
    name: 'Zhubný nádor týmusu'
  },
  {
    code: 'C38',
    name: 'Zhubný nádor srdca, medzipľúcia (mediastína) a pohrudnice'
  },
  {
    code: 'C39',
    name: 'Zhubný nádor iných a nepresne určených miest dýchacej sústavy a vnútrohrudníkových'
  },
  {
    code: 'C40',
    name: 'Zhubný nádor kosti a kĺbovej chrupky končatín'
  },
  {
    code: 'C41',
    name: 'Zhubný nádor kosti a kĺbovej chrupky iných a nešpecifikovaných lokalizácií'
  },
  {
    code: 'C43',
    name: 'Malígny melanóm kože'
  },
  {
    code: 'C44',
    name: 'Iné zhubné nádory kože'
  },
  {
    code: 'C45',
    name: 'Mezotelióm'
  },
  {
    code: 'C46',
    name: 'Kaposiho sarkóm'
  },
  {
    code: 'C47',
    name: 'Zhubný nádor periférnych nervov a autonómneho nervového systému'
  },
  {
    code: 'C48',
    name: 'Zhubný nádor retroperitonea a peritonea'
  },
  {
    code: 'C49',
    name: 'Zhubný nádor iného spojivového a mäkkého tkaniva'
  },
  {
    code: 'C50',
    name: 'Zhubný nádor prsníka'
  },
  {
    code: 'C51',
    name: 'Zhubný nádor vulvy (ženského ohanbia)'
  },
  {
    code: 'C52',
    name: 'Zhubný nádor pošvy'
  },
  {
    code: 'C53',
    name: 'Zhubný nádor krčka maternice'
  },
  {
    code: 'C54',
    name: 'Zhubný nádor tela maternice'
  },
  {
    code: 'C55',
    name: 'Zhubný nádor bližšie neurčenej časti maternice'
  },
  {
    code: 'C56',
    name: 'Zhubný nádor vaječníka'
  },
  {
    code: 'C57',
    name: 'Zhubný nádor iných a nešpecifikovaných ženských pohlavných orgánov'
  },
  {
    code: 'C58',
    name: 'Zhubný nádor placenty (postieľky)'
  },
  {
    code: 'C60',
    name: 'Zhubný nádor penisu'
  },
  {
    code: 'C61',
    name: 'Zhubný nádor predstojnice – prostaty'
  },
  {
    code: 'C62',
    name: 'Zhubný nádor semenníkov'
  },
  {
    code: 'C63',
    name: 'Zhubný nádor iných bližšie nešpecifikovaných mužských orgánov'
  },
  {
    code: 'C64',
    name: 'Zhubný nádor obličky okrem obličkovej panvičky'
  },
  {
    code: 'C65',
    name: 'Zhubný nádor obličkovej panvičky'
  },
  {
    code: 'C66',
    name: 'Zhubný nádor močovodu'
  },
  {
    code: 'C67',
    name: 'Zhubný nádor močového mechúra'
  },
  {
    code: 'C68',
    name: 'Zhubný nádor iných bližšie nešpecifikovaných močových orgánov'
  },
  {
    code: 'C69',
    name: 'Zhubný nádor oka a očných adnexov'
  },
  {
    code: 'C70',
    name: 'Zhubný nádor mozgových plien (meningov)'
  },
  {
    code: 'C71',
    name: 'Zhubný nádor mozgu'
  },
  {
    code: 'C72',
    name: 'Zhubný nádor miechy, hlavových nervov a iných častí nervového systému'
  },
  {
    code: 'C73',
    name: 'Zhubný nádor štítnej žľazy'
  },
  {
    code: 'C74',
    name: 'Zhubný nádor nadobličky'
  },
  {
    code: 'C75',
    name: 'Zhubný nádor iných žliaz s vnútorným vylučovaním a blízkych štruktúr'
  },
  {
    code: 'C76',
    name: 'Zhubný nádor inej a bližšie neurčenej lokalizácie'
  },
  {
    code: 'C77',
    name: 'Sekundárny a nešpecifikovaný zhubný nádor lymfatických uzlín'
  },
  {
    code: 'C78',
    name: 'Sekundárny zhubný nádor dýchacích a tráviacich orgánov'
  },
  {
    code: 'C79',
    name: 'Sekundárny zhubný nádor na iných miestach'
  },
  {
    code: 'C80',
    name: 'Zhubný nádor bez bližšieho určenia lokalizácie'
  },
  {
    code: 'C81',
    name: 'Hodgkinova choroba'
  },
  {
    code: 'C82',
    name: 'Folikulárny [nodulárny] non-Hodgkinov lymfóm'
  },
  {
    code: 'C83',
    name: 'Difúzny non-Hodgkinov lymfóm'
  },
  {
    code: 'C84',
    name: 'Periférne a kožné T-bunkové lymfómy'
  },
  {
    code: 'C85',
    name: 'Iné a nešpecifikované typy non-Hodgkinovho lymfómu'
  },
  {
    code: 'C88',
    name: 'Zhubné imunoproliferačné choroby'
  },
  {
    code: 'C90',
    name: 'Mnohonásobný myelóm (plazmocytóm) a zhubné nádory z plazmatických buniek'
  },
  {
    code: 'C91',
    name: 'Lymfatická leukémia'
  },
  {
    code: 'C92',
    name: 'Myeloická leukémia'
  },
  {
    code: 'C93',
    name: 'Monocytová leukémia'
  },
  {
    code: 'C94',
    name: 'Iné leukémie so špecifikovaným typom buniek'
  },
  {
    code: 'C95',
    name: 'Leukémia nešpecifikovaného bunkového typu'
  },
  {
    code: 'C96',
    name: 'Iné a nešpecifikované zhubné nádory lymfatického, krvotvorného a príbuzného tkaniva'
  },
  {
    code: 'C97',
    name: 'Zhubné nádory s viacnásobným primárnym výskytom na rozličných miestach'
  },
  {
    code: 'D00',
    name: 'Karcinómy in situ ústnej dutiny, pažeráka a žalúdka'
  },
  {
    code: 'D01',
    name: 'Karcinómy in situ iných a nešpecifikovaných tráviacich orgánov'
  },
  {
    code: 'D02',
    name: 'Karcinómy in situ stredného ucha a dýchacej sústavy'
  },
  {
    code: 'D03',
    name: 'Melanóm in situ'
  },
  {
    code: 'D04',
    name: 'Karcinómy in situ kože'
  },
  {
    code: 'D05',
    name: 'Karcinómy in situ prsníka'
  },
  {
    code: 'D06',
    name: 'Karcinómy in situ krčka maternice'
  },
  {
    code: 'D07',
    name: 'Karcinómy in situ iných a nešpecifikovaných pohlavných orgánov'
  },
  {
    code: 'D09',
    name: 'Karcinómy in situ iných a nešpecifikovaných lokalizácií'
  },
  {
    code: 'D10',
    name: 'Nezhubný nádor úst a hltana'
  },
  {
    code: 'D11',
    name: 'Nezhubný nádor veľkých slinných žliaz'
  },
  {
    code: 'D12',
    name: 'Nezhubný nádor hrubého čreva, konečníka, anusu a análneho kanála'
  },
  {
    code: 'D13',
    name: 'Nezhubný nádor iných a nepresne určených častí tráviacej sústavy'
  },
  {
    code: 'D14',
    name: 'Nezhubný nádor stredného ucha a dýchacej sústavy'
  },
  {
    code: 'D15',
    name: 'Nezhubný nádor iných a nešpecifikovaných vnútrohrudníkových orgánov'
  },
  {
    code: 'D16',
    name: 'Nezhubný nádor kosti a kĺbovej chrupky'
  },
  {
    code: 'D17',
    name: 'Nezhubný lipomatózny nádor'
  },
  {
    code: 'D18',
    name: 'Hemangióm a lymfangióm akejkoľvek lokalizácie'
  },
  {
    code: 'D19',
    name: 'Nezhubný nádor mezotelového tkaniva'
  },
  {
    code: 'D20',
    name: 'Nezhubný nádor mäkkého tkaniva retroperitonea a peritonea'
  },
  {
    code: 'D21',
    name: 'Iné nezhubné nádory spojivového a iného mäkkého tkaniva'
  },
  {
    code: 'D22',
    name: 'Melanocytové (pigmentové) névy'
  },
  {
    code: 'D23',
    name: 'Iné nezhubné nádory kože'
  },
  {
    code: 'D24',
    name: 'Nezhubný nádor prsníka'
  },
  {
    code: 'D25',
    name: 'Leiomyóm maternice'
  },
  {
    code: 'D26',
    name: 'Iné nezhubné nádory maternice'
  },
  {
    code: 'D27',
    name: 'Nezhubný nádor vaječníka'
  },
  {
    code: 'D28',
    name: 'Nezhubný nádor iných a nešpecifikovaných ženských pohlavných orgánov'
  },
  {
    code: 'D29',
    name: 'Nezhubný nádor mužských pohlavných orgánov'
  },
  {
    code: 'D30',
    name: 'Nezhubný nádor močovej sústavy'
  },
  {
    code: 'D31',
    name: 'Nezhubný nádor oka a očných adnexov'
  },
  {
    code: 'D32',
    name: 'Nezhubný nádor mozgových plien (meningov)'
  },
  {
    code: 'D33',
    name: 'Nezhubný nádor mozgu a iných častí centrálneho nervového systému'
  },
  {
    code: 'D34',
    name: 'Nezhubný nádor štítnej žľazy'
  },
  {
    code: 'D35',
    name: 'Nezhubný nádor iných a nešpecifikovaných žliaz s vnútorným vylučovaním'
  },
  {
    code: 'D36',
    name: 'Nezhubný nádor iných a nešpecifikovaných lokalizácií'
  },
  {
    code: 'D37',
    name: 'Nádor ústnej dutiny a tráviacich orgánov neurčitého alebo neznámeho správania'
  },
  {
    code: 'D38',
    name: 'Nádor stredného ucha, dýchacích a vnútrohrudníkových orgánov neurčitého alebo neznámeho správania'
  },
  {
    code: 'D39',
    name: 'Nádor ženských pohlavných orgánov neurčitého alebo neznámeho správania'
  },
  {
    code: 'D40',
    name: 'Nádor mužských pohlavných orgánov neurčitého alebo neznámeho správania'
  },
  {
    code: 'D41',
    name: 'Nádor močovej sústavy neurčitého alebo neznámeho správania'
  },
  {
    code: 'D42',
    name: 'Nádor mozgových plien (meningov) neurčitého alebo neznámeho správania'
  },
  {
    code: 'D43',
    name: 'Nádor mozgu a centrálneho nervového systému neurčitého alebo neznámeho správania'
  },
  {
    code: 'D44',
    name: 'Nádor žliaz s vnútorným vylučovaním neurčitého alebo neznámeho správania'
  },
  {
    code: 'D45',
    name: 'Polycythaemia vera'
  },
  {
    code: 'D46',
    name: 'Myelodysplastické syndrómy'
  },
  {
    code: 'D47',
    name: 'Iné nádory lymfatického, krvotvorného a príbuzného tkaniva neurčitého alebo neznámeho správania'
  },
  {
    code: 'D48',
    name: 'Nádor iných a nešpecifikovaných lokalizácií neurčitého alebo neznámeho správania'
  },
  {
    code: 'D50',
    name: 'Málokrvnosť z nedostatku železa'
  },
  {
    code: 'D51',
    name: 'Málokrvnosť z nedostatku vitamínu B12'
  },
  {
    code: 'D52',
    name: 'Málokrvnosť z nedostatku kyseliny listovej'
  },
  {
    code: 'D53',
    name: 'Iné nutričné málokrvnosti'
  },
  {
    code: 'D55',
    name: 'Anémia zavinená poruchami enzýmov'
  },
  {
    code: 'D56',
    name: 'Talasémia'
  },
  {
    code: 'D57',
    name: 'Kosáčikovité anémie'
  },
  {
    code: 'D58',
    name: 'Iné dedičné hemolytické anémie'
  },
  {
    code: 'D59',
    name: 'Získaná hemolytická anémia'
  },
  {
    code: 'D60',
    name: 'Získaná čistá aplázia červených krviniek – erytroblastopénia'
  },
  {
    code: 'D61',
    name: 'Iné aplastické anémie'
  },
  {
    code: 'D62',
    name: 'Akútna posthemoragická anémia'
  },
  {
    code: 'D63',
    name: 'Anémia pri chronických chorobách zatriedených inde'
  },
  {
    code: 'D64',
    name: 'Iné anémie'
  },
  {
    code: 'D65',
    name: 'Roztrúsená vnútrocievna koagulácia [defibrinačný syndróm]'
  },
  {
    code: 'D66',
    name: 'Dedičný nedostatok VIII. faktora'
  },
  {
    code: 'D67',
    name: 'Dedičný nedostatok IX. faktora'
  },
  {
    code: 'D68',
    name: 'Iné koagulačné poruchy'
  },
  {
    code: 'D69',
    name: 'Purpura a iné hemoragické choroby'
  },
  {
    code: 'D70',
    name: 'Agranulocytóza'
  },
  {
    code: 'D71',
    name: 'Funkčné poruchy polymorfonukleárnych neutrofilov'
  },
  {
    code: 'D72',
    name: 'Iné poruchy bielych krviniek'
  },
  {
    code: 'D73',
    name: 'Choroby sleziny'
  },
  {
    code: 'D74',
    name: 'Methemoglobinémia'
  },
  {
    code: 'D75',
    name: 'Iné choroby krvi a krvotvorných orgánov'
  },
  {
    code: 'D76',
    name: 'Choroby postihujúce lymforetikulárne tkanivo a retikulohistiocyty'
  },
  {
    code: 'D77',
    name: 'Iné poruchy krvi a krvotvorných orgánov pri chorobách zatriedených inde'
  },
  {
    code: 'D80',
    name: 'Imunitná nedostatočnosť s prevahou poruchy protilátok'
  },
  {
    code: 'D81',
    name: 'Kombinovaná imunitná nedostatočnosť'
  },
  {
    code: 'D82',
    name: 'Imunitná nedostatočnosť združená s inými ťažkými poruchami'
  },
  {
    code: 'D83',
    name: 'Bežná premenlivá imunitná nedostatočnosť'
  },
  {
    code: 'D84',
    name: 'Iné imunodeficiencie'
  },
  {
    code: 'D86',
    name: 'Sarkoidóza'
  },
  {
    code: 'D89',
    name: 'Iné poruchy imunitného mechanizmu nezatriedené inde'
  },
  {
    code: 'E00',
    name: 'Vrodený syndróm nedostatku jódu'
  },
  {
    code: 'E01',
    name: 'Poruchy činnosti štítnej žľazy súvisiace s nedostatkom jódu a podobné ochorenia'
  },
  {
    code: 'E02',
    name: 'Subklinická hypotyreóza z nedostatku jódu'
  },
  {
    code: 'E03',
    name: 'Iné hypotyreózy'
  },
  {
    code: 'E04',
    name: 'Iná netoxická struma'
  },
  {
    code: 'E05',
    name: 'Tyreotoxikóza – hypertyreóza'
  },
  {
    code: 'E06',
    name: 'Zápal štítnej žľazy – tyreoiditída'
  },
  {
    code: 'E07',
    name: 'Ostatné choroby štítnej žľazy'
  },
  {
    code: 'E10',
    name: 'Diabetes mellitus závislý od inzulínu'
  },
  {
    code: 'E11',
    name: 'Diabetes mellitus nezávislý od inzulínu'
  },
  {
    code: 'E12',
    name: 'Diabetes mellitus súvisiaci s podvýživou'
  },
  {
    code: 'E13',
    name: 'Iný bližšie určený diabetes mellitus'
  },
  {
    code: 'E14',
    name: 'Nešpecifikovaný diabetes mellitus'
  },
  {
    code: 'E15',
    name: 'Hypoglykemická kóma nediabetika'
  },
  {
    code: 'E16',
    name: 'Ostatné poruchy vnútorného vylučovania podžalúdkovej žľazy'
  },
  {
    code: 'E20',
    name: 'Hypoparatyreóza'
  },
  {
    code: 'E21',
    name: 'Hyperparatyreóza a iné choroby prištítnych žliaz'
  },
  {
    code: 'E22',
    name: 'Hyperfunkcia podmozgovej žľazy (hypofýzy)'
  },
  {
    code: 'E23',
    name: 'Hypofunkcia a iné choroby podmozgovej žľazy (hypofýzy)'
  },
  {
    code: 'E24',
    name: 'Cushingov syndróm'
  },
  {
    code: 'E25',
    name: 'Adrenogenitálny syndróm'
  },
  {
    code: 'E26',
    name: 'Hyperaldosteronizmus'
  },
  {
    code: 'E27',
    name: 'Iné choroby nadobličiek'
  },
  {
    code: 'E28',
    name: 'Poruchy činnosti vaječníkov'
  },
  {
    code: 'E29',
    name: 'Poruchy činnosti semenníkov'
  },
  {
    code: 'E30',
    name: 'Poruchy puberty nezatriedené inde'
  },
  {
    code: 'E31',
    name: 'Poruchy činnosti viacerých žliaz s vnútorným vylučovaním – polyglandulárna dysfunkcia'
  },
  {
    code: 'E32',
    name: 'Choroby týmusu'
  },
  {
    code: 'E34',
    name: 'Iné choroby žliaz s vnútorným vylučovaním'
  },
  {
    code: 'E35',
    name: 'Poruchy žliaz s vnútorným vylučovaním pri chorobách zatriedených inde'
  },
  {
    code: 'E40',
    name: 'Kvašiorkor'
  },
  {
    code: 'E41',
    name: 'Nutričný marazmus'
  },
  {
    code: 'E42',
    name: 'Marantický kvašiorkor'
  },
  {
    code: 'E43',
    name: 'Nešpecifická ťažká proteínovoenergetická podvýživa'
  },
  {
    code: 'E44',
    name: 'Proteínovoenergetická podvýživa stredného a mierneho stupňa'
  },
  {
    code: 'E45',
    name: 'Zaostávanie vývinu v dôsledku proteínovoenergetickej podvýživy'
  },
  {
    code: 'E46',
    name: 'Nešpecifikovaná proteínovoenergetická podvýživa'
  },
  {
    code: 'E50',
    name: 'Nedostatok vitamínu A'
  },
  {
    code: 'E51',
    name: 'Nedostatok tiamínu'
  },
  {
    code: 'E52',
    name: 'Nedostatok niacínu [pellagra]'
  },
  {
    code: 'E53',
    name: 'Nedostatok iných vitamínov zo skupiny B (B-komplexu)'
  },
  {
    code: 'E54',
    name: 'Nedostatok vitamínu C (kyseliny askorbovej)'
  },
  {
    code: 'E55',
    name: 'Nedostatok vitamínu D'
  },
  {
    code: 'E56',
    name: 'Nedostatok iných vitamínov'
  },
  {
    code: 'E58',
    name: 'Nedostatok vápnika v potrave'
  },
  {
    code: 'E59',
    name: 'Nedostatok selénu v potrave'
  },
  {
    code: 'E60',
    name: 'Nedostatok zinku v potrave'
  },
  {
    code: 'E61',
    name: 'Nedostatok iných prvkov výživy'
  },
  {
    code: 'E63',
    name: 'Iné nedostatky vo výžive'
  },
  {
    code: 'E64',
    name: 'Následky podvýživy a iných nedostatkov vo výžive'
  },
  {
    code: 'E65',
    name: 'Lokalizovaná adipozita'
  },
  {
    code: 'E66',
    name: 'Tučnota – obezita'
  },
  {
    code: 'E67',
    name: 'Iná nadmerná výživa'
  },
  {
    code: 'E68',
    name: 'Následky nadmernej výživy'
  },
  {
    code: 'E70',
    name: 'Poruchy metabolizmu aromatických aminokyselín'
  },
  {
    code: 'E71',
    name: 'Poruchy metabolizmu aminokyselín s rozvetveným reťazcom a mastných kyselín'
  },
  {
    code: 'E72',
    name: 'Iné poruchy metabolizmu aminokyselín'
  },
  {
    code: 'E73',
    name: 'Intolerancia laktózy'
  },
  {
    code: 'E74',
    name: 'Iné poruchy metabolizmu sacharidov'
  },
  {
    code: 'E75',
    name: 'Poruchy metabolizmu sfingolipidov a iné poruchy ukladania lipidov'
  },
  {
    code: 'E76',
    name: 'Poruchy metabolizmu glykozaminoglykánu'
  },
  {
    code: 'E77',
    name: 'Poruchy metabolizmu glykoproteínov'
  },
  {
    code: 'E78',
    name: 'Poruchy metabolizmu lipoproteínov a iné lipidémie'
  },
  {
    code: 'E79',
    name: 'Poruchy metabolizmu purínu a pyrimidínu'
  },
  {
    code: 'E80',
    name: 'Poruchy metabolizmu porfyrínu a bilirubínu'
  },
  {
    code: 'E83',
    name: 'Poruchy metabolizmu minerálov'
  },
  {
    code: 'E84',
    name: 'Cystická fibróza'
  },
  {
    code: 'E85',
    name: 'Amyloidóza'
  },
  {
    code: 'E86',
    name: 'Zníženie objemu telovej tekutiny – hypovolémia'
  },
  {
    code: 'E87',
    name: 'Iné poruchy rovnováhy tekutín, elektrolytov a acidobázickej rovnováhy'
  },
  {
    code: 'E88',
    name: 'Iné poruchy metabolizmu'
  },
  {
    code: 'E89',
    name: 'Pozákrokové endokrinné a metabolické poruchy nezatriedené inde'
  },
  {
    code: 'E90',
    name: 'Nutričné a metabolické poruchy pri chorobách zatriedených inde'
  },
  {
    code: 'F00',
    name: 'Demencia pri Alzheimerovej chorobe (G 30. – +)'
  },
  {
    code: 'F01',
    name: 'Vaskulárna artériosklerotická demencia'
  },
  {
    code: 'F02',
    name: 'Demencia pri iných chorobách zatriedených inde'
  },
  {
    code: 'F03',
    name: 'Nešpecifikovaná demencia'
  },
  {
    code: 'F04',
    name: 'Organický amnestický syndróm nezavinený alkoholom alebo inými psychoaktívnymi látkami'
  },
  {
    code: 'F05',
    name: 'Delírium nezavinené alkoholom alebo inými psychoaktívnymi látkami'
  },
  {
    code: 'F06',
    name: 'Iné duševné poruchy zapríčinené poškodením a dysfunkciou mozgu a somatickou chorobou'
  },
  {
    code: 'F07',
    name: 'Poruchy osobnosti a správania zapríčinené chorobou, poškodením a dysfunkciou mozgu'
  },
  {
    code: 'F09',
    name: 'Nešpecifikovaná organická alebo symptomatická psychická porucha'
  },
  {
    code: 'F10',
    name: 'Poruchy psychiky a správania zapríčinené užitím alkoholu'
  },
  {
    code: 'F11',
    name: 'Poruchy psychiky a správania zapríčinené užitím opiátov'
  },
  {
    code: 'F12',
    name: 'Poruchy psychiky a správania zapríčinené užitím kanabinoidov (marihuana, hašiš)'
  },
  {
    code: 'F13',
    name: 'Poruchy psychiky a správania zapríčinené užitím sedatív alebo hypnotík'
  },
  {
    code: 'F14',
    name: 'Poruchy psychiky a správania zapríčinené užitím kokaínu'
  },
  {
    code: 'F15',
    name: 'Poruchy psychiky a správania zapríčinené užitím iných stimulancií vrátane kofeínu'
  },
  {
    code: 'F16',
    name: 'Poruchy psychiky a správania zapríčinené užitím halucinogénov'
  },
  {
    code: 'F17',
    name: 'Poruchy psychiky a správania zapríčinené užitím tabaku'
  },
  {
    code: 'F18',
    name: 'Poruchy psychiky a správania zapríčinené užitím prchavých rozpúšťadiel'
  },
  {
    code: 'F19',
    name: 'Poruchy psychiky a správania zapríčinené užitím viacerých drog a iných psychoaktívnych látok'
  },
  {
    code: 'F20',
    name: 'Schizofrénia'
  },
  {
    code: 'F21',
    name: 'Schizotypová porucha'
  },
  {
    code: 'F22',
    name: 'Pretrvávajúce poruchy s bludmi'
  },
  {
    code: 'F23',
    name: 'Akútne a prechodné psychotické poruchy'
  },
  {
    code: 'F24',
    name: 'Indukovaná porucha s bludmi'
  },
  {
    code: 'F25',
    name: 'Schizoafektívne poruchy'
  },
  {
    code: 'F28',
    name: 'Iné neorganické psychotické poruchy'
  },
  {
    code: 'F29',
    name: 'Nešpecifikovaná neorganická psychóza'
  },
  {
    code: 'F30',
    name: 'Manická epizóda'
  },
  {
    code: 'F31',
    name: 'Bipolárna afektívna porucha'
  },
  {
    code: 'F32',
    name: 'Depresívne epizódy'
  },
  {
    code: 'F33',
    name: 'Recidivujúca depresívna porucha'
  },
  {
    code: 'F34',
    name: 'Pretrvávajúce afektívne poruchy'
  },
  {
    code: 'F38',
    name: 'Iné afektívne poruchy'
  },
  {
    code: 'F39',
    name: 'Nešpecifikované afektívne poruchy'
  },
  {
    code: 'F40',
    name: 'Fóbicko-anxiózne poruchy'
  },
  {
    code: 'F41',
    name: 'Iné úzkostné poruchy'
  },
  {
    code: 'F42',
    name: 'Obsesívno-kompulzívna porucha'
  },
  {
    code: 'F43',
    name: 'Reakcia na ťažký stres a adaptačné poruchy'
  },
  {
    code: 'F44',
    name: 'Disociatívne [konverzné] poruchy'
  },
  {
    code: 'F45',
    name: 'Somatoformné poruchy'
  },
  {
    code: 'F48',
    name: 'Iné neurotické poruchy'
  },
  {
    code: 'F50',
    name: 'Poruchy príjmu potravy'
  },
  {
    code: 'F51',
    name: 'Neorganické poruchy spánku'
  },
  {
    code: 'F52',
    name: 'Sexuálna dysfunkcia nezavinená organickou poruchou alebo chorobou'
  },
  {
    code: 'F53',
    name: 'Poruchy psychiky a správania v popôrodí nezatriedené inde'
  },
  {
    code: 'F54',
    name: 'Psychické faktory a faktory správania spojené s poruchami alebo chorobami zatriedenými inde'
  },
  {
    code: 'F55',
    name: 'Abúzus látok, ktoré nevytvárajú závislosť'
  },
  {
    code: 'F59',
    name: 'Nešpecifikované poruchy správania spojené s fyziologickými poruchami a somatickými faktormi'
  },
  {
    code: 'F60',
    name: 'Špecifické poruchy osobnosti'
  },
  {
    code: 'F61',
    name: 'Zmiešané a iné poruchy osobnosti'
  },
  {
    code: 'F62',
    name: 'Pretrvávajúce zmeny osobnosti nepripísateľné poškodeniu alebo chorobe mozgu'
  },
  {
    code: 'F63',
    name: 'Poruchy návykov a impulzov'
  },
  {
    code: 'F64',
    name: 'Poruchy sexuálnej identity'
  },
  {
    code: 'F65',
    name: 'Poruchy voľby sexuálneho objektu'
  },
  {
    code: 'F66',
    name: 'Poruchy psychiky a správania združené so sexuálnym vývinom a orientáciou'
  },
  {
    code: 'F68',
    name: 'Iné poruchy osobnosti a správania dospelých'
  },
  {
    code: 'F69',
    name: 'Nešpecifikovaná porucha osobnosti a správania dospelých'
  },
  {
    code: 'F70',
    name: 'Ľahká duševná zaostalosť'
  },
  {
    code: 'F71',
    name: 'Stredný stupeň duševnej zaostalosti'
  },
  {
    code: 'F72',
    name: 'Ťažká duševná zaostalosť'
  },
  {
    code: 'F73',
    name: 'Hlboká duševná zaostalosť'
  },
  {
    code: 'F78',
    name: 'Iná duševná zaostalosť'
  },
  {
    code: 'F79',
    name: 'Nešpecifikovaná duševná zaostalosť'
  },
  {
    code: 'F80',
    name: 'Špecifické poruchy vývinu reči a jazyka'
  },
  {
    code: 'F81',
    name: 'Špecifické poruchy vývinu školských zručností'
  },
  {
    code: 'F82',
    name: 'Špecifická porucha vývinu pohybovej funkcie'
  },
  {
    code: 'F83',
    name: 'Zmiešané špecifické vývinové poruchy'
  },
  {
    code: 'F84',
    name: 'Prenikavé poruchy vývinu'
  },
  {
    code: 'F88',
    name: 'Iné poruchy psychického vývinu'
  },
  {
    code: 'F89',
    name: 'Nešpecifikovaná porucha psychického vývinu'
  },
  {
    code: 'F90',
    name: 'Hyperkinetické poruchy'
  },
  {
    code: 'F91',
    name: 'Poruchy správania'
  },
  {
    code: 'F92',
    name: 'Zmiešané poruchy správania a emočné poruchy'
  },
  {
    code: 'F93',
    name: 'Emočné poruchy so začiatkom špecifickým pre detstvo'
  },
  {
    code: 'F94',
    name: 'Poruchy sociálneho fungovania so začiatkom špecifickým pre detstvo a dospievanie'
  },
  {
    code: 'F95',
    name: 'Tikové poruchy'
  },
  {
    code: 'F98',
    name: 'Iné poruchy správania a emočné poruchy so zvyčajným začiatkom v detstve a počas dospievania'
  },
  {
    code: 'F99',
    name: 'Bližšie nešpecifikovaná duševná porucha'
  },
  {
    code: 'G00',
    name: 'Bakteriálny zápal mozgových plien (meningitis) nezatriedený inde'
  },
  {
    code: 'G01',
    name: 'Zápal mozgových plien (meningitis) pri bakteriálnych chorobách zatriedených inde'
  },
  {
    code: 'G02',
    name: 'Zápal mozgových plien (meningitis) pri iných infekčných a parazitárnych chorobách zatriedených inde'
  },
  {
    code: 'G03',
    name: 'Zápal mozgových plien (meningitis) vyvolaný inými a nešpecifikovanými príčinami'
  },
  {
    code: 'G04',
    name: 'Zápal mozgu, miechy, mozgu aj miechy – encephalitis, myelitis a encephalomyelitis'
  },
  {
    code: 'G05',
    name: 'Zápal mozgu, miechy, mozgu aj miechy – encephalitis, myelitis a encephalomyelitis pri chorobách zatriedených inde'
  },
  {
    code: 'G06',
    name: 'Vnútrolebkový a vnútrochrbticový absces a granulóm – intrakraniálny a intraspinálny absces a granulóm'
  },
  {
    code: 'G07',
    name: 'Vnútrolebkový a vnútrochrbticový absces a granulóm pri chorobách zatriedených inde'
  },
  {
    code: 'G08',
    name: 'Vnútrolebkový a vnútrochrbticový zápal žíl a zápal žíl s krvnou zrazeninou – intrakraniálna a intraspinálna flebitída a tromboflebitída'
  },
  {
    code: 'G09',
    name: 'Neskoré následky zápalových chorôb centrálneho nervového systému'
  },
  {
    code: 'G10',
    name: 'Huntingtonova choroba'
  },
  {
    code: 'G11',
    name: 'Hereditárna ataxia'
  },
  {
    code: 'G12',
    name: 'Spinálna svalová atrofia a príbuzné syndrómy'
  },
  {
    code: 'G13',
    name: 'Systémové atrofie prvotne postihujúce centrálny nervový systém pri chorobách zatriedených inde'
  },
  {
    code: 'G20',
    name: 'Parkinsonova choroba'
  },
  {
    code: 'G21',
    name: 'Sekundárny parkinsonizmus'
  },
  {
    code: 'G22',
    name: 'Parkinsonizmus pri chorobách zatriedených inde'
  },
  {
    code: 'G23',
    name: 'Iné degeneratívne choroby bazálnych ganglií'
  },
  {
    code: 'G24',
    name: 'Dystónia'
  },
  {
    code: 'G25',
    name: 'Iné extrapyramídové poruchy a poruchy hýbavosti'
  },
  {
    code: 'G26',
    name: 'Extrapyramídové poruchy a poruchy hýbavosti pri chorobách zatriedených inde'
  },
  {
    code: 'G30',
    name: 'Alzheimerova choroba'
  },
  {
    code: 'G31',
    name: 'Iné degeneratívne choroby nervového systému nezatriedené inde'
  },
  {
    code: 'G32',
    name: 'Iné degeneratívne poruchy nervového systému pri chorobách zatriedených inde'
  },
  {
    code: 'G35',
    name: 'Roztrúsená skleróza – sclerosis multiplex'
  },
  {
    code: 'G36',
    name: 'Iná akútna roztrúsená demyelinizácia'
  },
  {
    code: 'G37',
    name: 'Iné demyelinizačné choroby centrálneho nervového systému'
  },
  {
    code: 'G40',
    name: 'Epilepsia – zrádnik'
  },
  {
    code: 'G41',
    name: 'Epileptický stav – status epilepticus'
  },
  {
    code: 'G43',
    name: 'Migréna'
  },
  {
    code: 'G44',
    name: 'Iné syndrómy bolesti hlavy'
  },
  {
    code: 'G45',
    name: 'Prechodné mozgové ischemické ataky a príbuzné syndrómy'
  },
  {
    code: 'G46',
    name: 'Cievne syndrómy mozgu pri cerebrovaskulárnych chorobách'
  },
  {
    code: 'G47',
    name: 'Poruchy spánku'
  },
  {
    code: 'G50',
    name: 'Poruchy trojklaného nervu (n. trigeminus)'
  },
  {
    code: 'G51',
    name: 'Poruchy tvárového nervu (n. facialis)'
  },
  {
    code: 'G52',
    name: 'Poruchy ostatných hlavových nervov'
  },
  {
    code: 'G53',
    name: 'Poruchy hlavových nervov pri chorobách zatriedených inde'
  },
  {
    code: 'G54',
    name: 'Poruchy nervových koreňov a spletí'
  },
  {
    code: 'G55',
    name: 'Kompresie nervových koreňov a spletí pri chorobách zatriedených inde'
  },
  {
    code: 'G56',
    name: 'Mononeuropatie hornej končatiny'
  },
  {
    code: 'G57',
    name: 'Mononeuropatie dolnej končatiny'
  },
  {
    code: 'G58',
    name: 'Iné mononeuropatie'
  },
  {
    code: 'G59',
    name: 'Mononeuropatia pri chorobách zatriedených inde'
  },
  {
    code: 'G60',
    name: 'Dedičná a idiopatická neuropatia'
  },
  {
    code: 'G61',
    name: 'Zápalová polyneuropatia'
  },
  {
    code: 'G62',
    name: 'Iné polyneuropatie'
  },
  {
    code: 'G63',
    name: 'Polyneuropatia pri chorobách zatriedených inde'
  },
  {
    code: 'G64',
    name: 'Iné poruchy periférneho nervového systému'
  },
  {
    code: 'G70',
    name: 'Myasthenia gravis a iné poruchy nervovosvalovej platničky'
  },
  {
    code: 'G71',
    name: 'Primárne poruchy svalov'
  },
  {
    code: 'G72',
    name: 'Iné myopatie'
  },
  {
    code: 'G73',
    name: 'Poruchy nervovosvalovej platničky a svalu pri chorobách zatriedených inde'
  },
  {
    code: 'G80',
    name: 'Detské mozgové ochrnutie'
  },
  {
    code: 'G81',
    name: 'Hemiplégia'
  },
  {
    code: 'G82',
    name: 'Paraplégia a tetraplégia (kvadruplégia)'
  },
  {
    code: 'G83',
    name: 'Iné paralytické syndrómy'
  },
  {
    code: 'G90',
    name: 'Poruchy autonómneho nervového systému'
  },
  {
    code: 'G91',
    name: 'Vodnatieľka mozgu – hydrocefalus'
  },
  {
    code: 'G92',
    name: 'Toxická encefalopatia'
  },
  {
    code: 'G93',
    name: 'Iné poruchy mozgu'
  },
  {
    code: 'G94',
    name: 'Iné poruchy mozgu pri chorobách zatriedených inde'
  },
  {
    code: 'G95',
    name: 'Iné choroby miechy'
  },
  {
    code: 'G96',
    name: 'Iné poruchy centrálneho nervového systému'
  },
  {
    code: 'G97',
    name: 'Pozákrokové poruchy nervového systému nezatriedené inde'
  },
  {
    code: 'G98',
    name: 'Iné poruchy nervového systému nezatriedené inde'
  },
  {
    code: 'G99',
    name: 'Iné poruchy nervového systému pri chorobách zatriedených inde'
  },
  {
    code: 'H00',
    name: 'Hordeolum – jačmeň a chalazion – studený jačmeň'
  },
  {
    code: 'H01',
    name: 'Iný zápal mihalnice'
  },
  {
    code: 'H02',
    name: 'Iné choroby mihalnice'
  },
  {
    code: 'H03',
    name: 'Choroby mihalnice pri chorobách zatriedených inde'
  },
  {
    code: 'H04',
    name: 'Choroby slzných orgánov'
  },
  {
    code: 'H05',
    name: 'Choroby očnice'
  },
  {
    code: 'H06',
    name: 'Choroby slzných orgánov a očnice pri chorobách zatriedených inde'
  },
  {
    code: 'H10',
    name: 'Zápal spojovky – conjunctivitis'
  },
  {
    code: 'H11',
    name: 'Iné choroby spojovky'
  },
  {
    code: 'H13',
    name: 'Choroby spojovky pri chorobách zatriedených inde'
  },
  {
    code: 'H15',
    name: 'Choroby bielka'
  },
  {
    code: 'H16',
    name: 'Zápal rohovky – keratitis'
  },
  {
    code: 'H17',
    name: 'Jazvy a zákaly rohovky'
  },
  {
    code: 'H18',
    name: 'Iné choroby rohovky'
  },
  {
    code: 'H19',
    name: 'Choroby bielka a rohovky pri chorobách zatriedených inde'
  },
  {
    code: 'H20',
    name: 'Iridocyklitída'
  },
  {
    code: 'H21',
    name: 'Iné choroby dúhovky a vráskovca'
  },
  {
    code: 'H22',
    name: 'Choroby dúhovky a vráskovca pri chorobách zatriedených inde'
  },
  {
    code: 'H25',
    name: 'Starecký zákal šošovky – cataracta senilis'
  },
  {
    code: 'H26',
    name: 'Iný zákal šošovky'
  },
  {
    code: 'H27',
    name: 'Iné choroby šošovky'
  },
  {
    code: 'H28',
    name: 'Zákal šošovky a iné choroby šošovky pri chorobách zatriedených inde'
  },
  {
    code: 'H30',
    name: 'Zápal cievovky a sietnice – chorioretinitis'
  },
  {
    code: 'H31',
    name: 'Iné choroby cievovky'
  },
  {
    code: 'H32',
    name: 'Choroby cievovky a sietnice pri chorobách zatriedených inde'
  },
  {
    code: 'H33',
    name: 'Odlúpenie sietnice – amotio retinae a natrhnutie sietnice – ruptura retinae'
  },
  {
    code: 'H34',
    name: 'Cievne oklúzie sietnice'
  },
  {
    code: 'H35',
    name: 'Iné choroby sietnice'
  },
  {
    code: 'H36',
    name: 'Choroby sietnice pri chorobách zatriedených inde'
  },
  {
    code: 'H40',
    name: 'Glaukóm'
  },
  {
    code: 'H42',
    name: 'Glaukóm pri chorobách zatriedených inde'
  },
  {
    code: 'H43',
    name: 'Choroby sklovca'
  },
  {
    code: 'H44',
    name: 'Choroby očnej gule'
  },
  {
    code: 'H45',
    name: 'Choroby sklovca a očnej gule pri chorobách zatriedených inde'
  },
  {
    code: 'H46',
    name: 'Zápal zrakového nervu – neuritis nervi optici'
  },
  {
    code: 'H47',
    name: 'Iné choroby zrakového nervu a zrakových dráh'
  },
  {
    code: 'H48',
    name: 'Choroby zrakového nervu a zrakových dráh pri chorobách zatriedených inde'
  },
  {
    code: 'H49',
    name: 'Paralytický strabizmus (škuľavosť)'
  },
  {
    code: 'H50',
    name: 'Iný strabizmus (škuľavosť)'
  },
  {
    code: 'H51',
    name: 'Iné poruchy binokulárnych pohybov'
  },
  {
    code: 'H52',
    name: 'Poruchy refrakcie a akomodácie'
  },
  {
    code: 'H53',
    name: 'Poruchy videnia'
  },
  {
    code: 'H54',
    name: 'Slepota a slabozrakosť'
  },
  {
    code: 'H55',
    name: 'Nystagmus a iné nepravidelné pohyby oka'
  },
  {
    code: 'H57',
    name: 'Iné choroby oka a jeho adnexov'
  },
  {
    code: 'H58',
    name: 'Iné choroby oka a jeho adnexov pri chorobách zatriedených inde'
  },
  {
    code: 'H59',
    name: 'Pozákrokové choroby oka a očných adnexov nezatriedené inde'
  },
  {
    code: 'H60',
    name: 'Zápal vonkajšieho ucha – otitis externa'
  },
  {
    code: 'H61',
    name: 'Iné choroby vonkajšieho ucha'
  },
  {
    code: 'H62',
    name: 'Choroby vonkajšieho ucha pri chorobách zatriedených inde'
  },
  {
    code: 'H65',
    name: 'Nehnisavý zápal stredného ucha – otitis media non suppurativa'
  },
  {
    code: 'H66',
    name: 'Hnisavý a nešpecifikovaný zápal stredného ucha'
  },
  {
    code: 'H67',
    name: 'Zápal stredného ucha pri chorobách zatriedených inde'
  },
  {
    code: 'H68',
    name: 'Zápal a zapchatie sluchovej trubice'
  },
  {
    code: 'H69',
    name: 'Iné choroby sluchovej trubice'
  },
  {
    code: 'H70',
    name: 'Zápal hlávkového výbežku – mastoiditis a príbuzné choroby'
  },
  {
    code: 'H71',
    name: 'Cholesteatóm stredného ucha'
  },
  {
    code: 'H72',
    name: 'Prederavenie – perforácia bubníkovej blany'
  },
  {
    code: 'H73',
    name: 'Iné choroby bubníkovej blany'
  },
  {
    code: 'H74',
    name: 'Iné choroby stredného ucha a hlávkového výbežku'
  },
  {
    code: 'H75',
    name: 'Iné choroby stredného ucha a hlávkového výbežku pri chorobách zatriedených inde'
  },
  {
    code: 'H80',
    name: 'Otoskleróza'
  },
  {
    code: 'H81',
    name: 'Poruchy vestibulárnej funkcie'
  },
  {
    code: 'H82',
    name: 'Vertiginózne (ošiaľové) syndrómy pri chorobách zatriedených inde'
  },
  {
    code: 'H83',
    name: 'Iné choroby vnútorného ucha'
  },
  {
    code: 'H90',
    name: 'Konduktívna a senzorineurálna strata sluchu (nedočujnosť)'
  },
  {
    code: 'H91',
    name: 'Strata sluchu iného typu'
  },
  {
    code: 'H92',
    name: 'Bolesť v uchu – otalgia a výtok z ucha – otorea'
  },
  {
    code: 'H93',
    name: 'Iné choroby ucha nezatriedené inde'
  },
  {
    code: 'H94',
    name: 'Iné choroby ucha pri chorobách zatriedených inde'
  },
  {
    code: 'H95',
    name: 'Pozákrokové choroby ucha a hlávkového výbežku nezatriedené inde'
  },
  {
    code: 'I00',
    name: 'Reumatická horúčka – febris rheumatica, bez zmienky o postihnutí srdca'
  },
  {
    code: 'I01',
    name: 'Reumatická horúčka s postihnutím srdca'
  },
  {
    code: 'I02',
    name: 'Reumatická chorea'
  },
  {
    code: 'I05',
    name: 'Reumatické choroby mitrálnej chlopne'
  },
  {
    code: 'I06',
    name: 'Reumatické choroby aortálnej chlopne'
  },
  {
    code: 'I07',
    name: 'Reumatické choroby trikuspidálnej chlopne'
  },
  {
    code: 'I08',
    name: 'Choroby viacerých chlopní'
  },
  {
    code: 'I09',
    name: 'Iné reumatické choroby srdca'
  },
  {
    code: 'I10',
    name: 'Esenciálna (primárna) hypertenzia'
  },
  {
    code: 'I11',
    name: 'Hypertenzná choroba srdca'
  },
  {
    code: 'I12',
    name: 'Hypertenzná choroba obličiek'
  },
  {
    code: 'I13',
    name: 'Hypertenzná choroba srdca a obličiek'
  },
  {
    code: 'I15',
    name: 'Sekundárna hypertenzia'
  },
  {
    code: 'I20',
    name: 'Angina pectoris – hrudníková angína'
  },
  {
    code: 'I21',
    name: 'Akútny infarkt myokardu'
  },
  {
    code: 'I22',
    name: 'Ďalší infarkt myokardu'
  },
  {
    code: 'I23',
    name: 'Niektoré terajšie komplikácie po akútnom infarkte myokardu'
  },
  {
    code: 'I24',
    name: 'Iné akútne formy ischemickej choroby srdca'
  },
  {
    code: 'I25',
    name: 'Chronická ischemická choroba srdca'
  },
  {
    code: 'I26',
    name: 'Pľúcna embólia'
  },
  {
    code: 'I27',
    name: 'Iné typy cor pulmonale (pľúcneho srdca)'
  },
  {
    code: 'I28',
    name: 'Iné choroby pľúcnych ciev'
  },
  {
    code: 'I30',
    name: 'Akútny zápal osrdcovníka – pericarditis acuta'
  },
  {
    code: 'I31',
    name: 'Iné choroby osrdcovníka'
  },
  {
    code: 'I32',
    name: 'Zápal osrdcovníka pri chorobách zatriedených inde'
  },
  {
    code: 'I33',
    name: 'Akútny a subakútny zápal vnútrosrdia – endocarditis acuta et subacuta'
  },
  {
    code: 'I34',
    name: 'Nereumatické choroby mitrálnej chlopne'
  },
  {
    code: 'I35',
    name: 'Nereumatické choroby aortálnej chlopne'
  },
  {
    code: 'I36',
    name: 'Nereumatické choroby trikuspidálnej chlopne'
  },
  {
    code: 'I37',
    name: 'Choroby pulmonálnej chlopne'
  },
  {
    code: 'I38',
    name: 'Zápal vnútrosrdia – endokarditída – nešpecifikovanej chlopne'
  },
  {
    code: 'I39',
    name: 'Zápal vnútrosrdia – endokarditída – chlopňové chyby pri chorobách zatriedených inde'
  },
  {
    code: 'I40',
    name: 'Akútny zápal srdcového svalu – myocarditis acuta'
  },
  {
    code: 'I41',
    name: 'Zápal srdcového svalu – myokarditída – pri chorobách zatriedených inde'
  },
  {
    code: 'I42',
    name: 'Kardiomyopatie'
  },
  {
    code: 'I43',
    name: 'Kardiomyopatia pri chorobách zatriedených inde'
  },
  {
    code: 'I44',
    name: 'Átrioventrikulárna blokáda a blokáda ľavého ramienka'
  },
  {
    code: 'I45',
    name: 'Iné poruchy vedenia srdcových vzruchov'
  },
  {
    code: 'I46',
    name: 'Zastavenie srdca'
  },
  {
    code: 'I47',
    name: 'Paroxyzmálna tachykardia'
  },
  {
    code: 'I48',
    name: 'Predsieňová fibrilácia a flater'
  },
  {
    code: 'I49',
    name: 'Iné srdcové arytmie'
  },
  {
    code: 'I50',
    name: 'Srdcové zlyhanie'
  },
  {
    code: 'I51',
    name: 'Komplikácie a nepresne opísané choroby srdca'
  },
  {
    code: 'I52',
    name: 'Iné choroby srdca pri chorobách zatriedených inde'
  },
  {
    code: 'I60',
    name: 'Subarachnoidálne krvácanie'
  },
  {
    code: 'I61',
    name: 'Mozgové – intracerebrálne – krvácanie'
  },
  {
    code: 'I62',
    name: 'Iné neúrazové vnútrolebkové krvácanie'
  },
  {
    code: 'I63',
    name: 'Mozgový infarkt'
  },
  {
    code: 'I64',
    name: 'Porážka – apoplexia – nešpecifikovaná ako krvácanie alebo infarkt'
  },
  {
    code: 'I65',
    name: 'Oklúzia a stenóza mimolebkových (precerebrálnych) tepien, ktorá nevyvoláva mozgový infarkt'
  },
  {
    code: 'I66',
    name: 'Oklúzia a stenóza mozgových tepien, ktorá nevyvoláva mozgový infarkt'
  },
  {
    code: 'I67',
    name: 'Iné cievne choroby mozgu'
  },
  {
    code: 'I68',
    name: 'Cievne choroby mozgu pri chorobách zatriedených inde'
  },
  {
    code: 'I69',
    name: 'Neskoré následky cievnych mozgových chorôb'
  },
  {
    code: 'I70',
    name: 'Ateroskleróza'
  },
  {
    code: 'I71',
    name: 'Vydutina – aneuryzma a rázštepová vydutina aorty – aneurysma dissecans'
  },
  {
    code: 'I72',
    name: 'Iné vydutiny'
  },
  {
    code: 'I73',
    name: 'Iné choroby periférnych ciev'
  },
  {
    code: 'I74',
    name: 'Arteriálna embólia a trombóza'
  },
  {
    code: 'I77',
    name: 'Iné choroby tepien a tepničiek'
  },
  {
    code: 'I78',
    name: 'Choroby vlásočníc'
  },
  {
    code: 'I79',
    name: 'Choroby tepien, tepničiek a vlásočníc pri chorobách zatriedených inde'
  },
  {
    code: 'I80',
    name: 'Zápal žíl – phlebitis et thrombophlebitis'
  },
  {
    code: 'I81',
    name: 'Trombóza vrátnice (vena portae)'
  },
  {
    code: 'I82',
    name: 'Iná žilová embólia a trombózy'
  },
  {
    code: 'I83',
    name: 'Kŕčové žily – varixy – dolných končatín'
  },
  {
    code: 'I84',
    name: 'Hemoroidy'
  },
  {
    code: 'I85',
    name: 'Kŕčové žily pažeráka – ezofágové varixy'
  },
  {
    code: 'I86',
    name: 'Kŕčové žily v iných lokalizáciách'
  },
  {
    code: 'I87',
    name: 'Iné choroby žíl'
  },
  {
    code: 'I88',
    name: 'Nešpecifická lymfadenitída'
  },
  {
    code: 'I89',
    name: 'Iné neinfekčné choroby lymfatických ciev a uzlín'
  },
  {
    code: 'I95',
    name: 'Hypotenzia'
  },
  {
    code: 'I97',
    name: 'Pozákrokové poruchy obehovej sústavy nezatriedené inde'
  },
  {
    code: 'I98',
    name: 'Iné choroby obehovej sústavy pri chorobách zatriedených inde'
  },
  {
    code: 'I99',
    name: 'Iné a nešpecifikované choroby obehovej sústavy'
  },
  {
    code: 'J00',
    name: 'Akútny zápal nosohltana [nasopharyngitis acuta – nádcha]'
  },
  {
    code: 'J01',
    name: 'Akútny zápal prinosových dutín – sinusitis acuta'
  },
  {
    code: 'J02',
    name: 'Akútny zápal hltana – pharyngitis acuta'
  },
  {
    code: 'J03',
    name: 'Akútny zápal mandlí – tonsillitis acuta'
  },
  {
    code: 'J04',
    name: 'Akútny zápal hrtana a priedušnice – laryngitis et tracheitis acuta'
  },
  {
    code: 'J05',
    name: 'Akútny obštrukčný zápal hrtana – krup a zápal hrtanovej príklopky – epiglottitis'
  },
  {
    code: 'J06',
    name: 'Akútne infekcie horných dýchacích ciest na viacerých a nešpecifikovaných miestach'
  },
  {
    code: 'J10',
    name: 'Chrípka vyvolaná identifikovaným vírusom chrípky'
  },
  {
    code: 'J11',
    name: 'Chrípka vyvolaná neidentifikovaným vírusom'
  },
  {
    code: 'J12',
    name: 'Vírusový zápal pľúc nezatriedený inde'
  },
  {
    code: 'J13',
    name: 'Zápal pľúc vyvolaný Streptococcus pneumoniae'
  },
  {
    code: 'J14',
    name: 'Zápal pľúc vyvolaný Haemophilus influenzae'
  },
  {
    code: 'J15',
    name: 'Bakteriálny zápal pľúc nezatriedený inde'
  },
  {
    code: 'J16',
    name: 'Zápal pľúc vyvolaný inými mikroorganizmami nezatriedený inde'
  },
  {
    code: 'J17',
    name: 'Zápal pľúc pri chorobách zatriedených inde'
  },
  {
    code: 'J18',
    name: 'Zápal pľúc vyvolaný nešpecifikovaným mikroorganizmom'
  },
  {
    code: 'J20',
    name: 'Akútny zápal priedušiek – bronchitis acuta'
  },
  {
    code: 'J21',
    name: 'Akútny zápal priedušničiek – bronchiolitis acuta'
  },
  {
    code: 'J22',
    name: 'Nešpecifikovaná akútna infekcia dolných dýchacích ciest'
  },
  {
    code: 'J30',
    name: 'Vazomotorická a alergická nádcha (rinitída)'
  },
  {
    code: 'J31',
    name: 'Chronický zápal nosa, nosohltana a hltana – rhinitis, nasopharyngitis et pharyngitis chronica'
  },
  {
    code: 'J32',
    name: 'Chronický zápal prinosových dutín – sinusitis chronica'
  },
  {
    code: 'J33',
    name: 'Nosový polyp'
  },
  {
    code: 'J34',
    name: 'Iné choroby nosa a prinosových dutín'
  },
  {
    code: 'J35',
    name: 'Chronické choroby mandlí a adenoidného tkaniva'
  },
  {
    code: 'J36',
    name: 'Peritonzilárny absces'
  },
  {
    code: 'J37',
    name: 'Chronická laryngitída a laryngotracheitída'
  },
  {
    code: 'J38',
    name: 'Choroby hlasiviek a hrtana nezatriedené inde'
  },
  {
    code: 'J39',
    name: 'Iné choroby horných dýchacích ciest'
  },
  {
    code: 'J40',
    name: 'Bronchitída neurčená ako akútna alebo chronická'
  },
  {
    code: 'J41',
    name: 'Jednoduchá a mukopurulentná chronická bronchitída'
  },
  {
    code: 'J42',
    name: 'Nešpecifikovaná chronická bronchitída'
  },
  {
    code: 'J43',
    name: 'Emfyzém pľúc – rozdutie pľúc'
  },
  {
    code: 'J44',
    name: 'Iná zdĺhavá obštrukčná pľúcna choroba'
  },
  {
    code: 'J45',
    name: 'Astma – záduch'
  },
  {
    code: 'J46',
    name: 'Status asthmaticus – záduchový stav'
  },
  {
    code: 'J47',
    name: 'Bronchiektázie – rozšírenie priedušiek'
  },
  {
    code: 'J60',
    name: 'Pneumokonióza baníkov uhoľných baní'
  },
  {
    code: 'J61',
    name: 'Pneumokonióza zapríčinená azbestom a inými nerastnými vláknami'
  },
  {
    code: 'J62',
    name: 'Silikóza'
  },
  {
    code: 'J63',
    name: 'Pneumokonióza zapríčinená inými anorganickými prachmi'
  },
  {
    code: 'J64',
    name: 'Nešpecifikovaná pneumokonióza'
  },
  {
    code: 'J65',
    name: 'Pneumokonióza združená s tuberkulózou'
  },
  {
    code: 'J66',
    name: 'Choroby dýchacích ciest zapríčinené špecifickým organickým prachom'
  },
  {
    code: 'J67',
    name: 'Exogénna alergická alveolitída zapríčinená organickým prachom'
  },
  {
    code: 'J68',
    name: 'Choroby dýchacej sústavy zapríčinené vdychovaním chemikálií, plynov, dymov a pár'
  },
  {
    code: 'J69',
    name: 'Pneumonitída vyvolaná tuhými látkami alebo tekutinami'
  },
  {
    code: 'J70',
    name: 'Choroby dýchacích ciest zapríčinené inými vonkajšími činiteľmi'
  },
  {
    code: 'J80',
    name: 'Syndróm respiračnej tvŕdze dospelých'
  },
  {
    code: 'J81',
    name: 'Pľúcny opuch – oedema pulmonum'
  },
  {
    code: 'J82',
    name: 'Pľúcna eozinofília nezatriedená inde'
  },
  {
    code: 'J84',
    name: 'Iné choroby interstícia pľúc'
  },
  {
    code: 'J85',
    name: 'Absces pľúc a medzipľúcia'
  },
  {
    code: 'J86',
    name: 'Pyotorax'
  },
  {
    code: 'J90',
    name: 'Pohrudnicový výpotok nezatriedený inde'
  },
  {
    code: 'J91',
    name: 'Pohrudnicový výpotok pri chorobách zatriedených inde'
  },
  {
    code: 'J92',
    name: 'Pleurálne zrasty a iné produktívne afekcie'
  },
  {
    code: 'J93',
    name: 'Pneumotorax'
  },
  {
    code: 'J94',
    name: 'Iné choroby pohrudnice'
  },
  {
    code: 'J95',
    name: 'Pozákrokové respiračné ochorenia nezatriedené inde'
  },
  {
    code: 'J96',
    name: 'Respiračné zlyhanie nezatriedené inde'
  },
  {
    code: 'J98',
    name: 'Iné choroby dýchacej sústavy'
  },
  {
    code: 'J99',
    name: 'Choroby dýchacej sústavy pri chorobách zatriedených inde'
  },
  {
    code: 'K00',
    name: 'Poruchy vývinu a erupcie zubov'
  },
  {
    code: 'K01',
    name: 'Retencia a impaktovanie zubov'
  },
  {
    code: 'K02',
    name: 'Zubný kaz – karies'
  },
  {
    code: 'K03',
    name: 'Iné choroby tvrdých tkanív zubov'
  },
  {
    code: 'K04',
    name: 'Choroby zubnej pulpy a periapikálnych tkanív'
  },
  {
    code: 'K05',
    name: 'Zápaly ďasien – gingivitídy – a periodontálne choroby'
  },
  {
    code: 'K06',
    name: 'Iné choroby ďasien a bezzubého alveolárneho hrebeňa'
  },
  {
    code: 'K07',
    name: 'Dentofaciálne anomálie [vrátane chýb zhryzu]'
  },
  {
    code: 'K08',
    name: 'Iné choroby zubov a podporných štruktúr'
  },
  {
    code: 'K09',
    name: 'Cysty v oblasti úst nezatriedené inde'
  },
  {
    code: 'K10',
    name: 'Iné choroby čeľustí'
  },
  {
    code: 'K11',
    name: 'Choroby slinných žliaz'
  },
  {
    code: 'K12',
    name: 'Zápal ústnej sliznice – stomatitis – a príbuzné ochorenia'
  },
  {
    code: 'K13',
    name: 'Iné choroby pery a ústnej sliznice'
  },
  {
    code: 'K14',
    name: 'Choroby jazyka'
  },
  {
    code: 'K20',
    name: 'Zápal pažeráka – ezofagitída'
  },
  {
    code: 'K21',
    name: 'Gastroezofágová refluxová choroba'
  },
  {
    code: 'K22',
    name: 'Iné choroby pažeráka'
  },
  {
    code: 'K23',
    name: 'Choroby pažeráka pri chorobách zatriedených inde'
  },
  {
    code: 'K25',
    name: 'Žalúdkový vred – ulcus ventriculi'
  },
  {
    code: 'K26',
    name: 'Dvanástnikový vred – ulcus duodeni'
  },
  {
    code: 'K90',
    name: 'Črevná malabsorpcia'
  },
  {
    code: 'K91',
    name: 'Pozákrokové ochorenia tráviacej sústavy nezatriedené inde'
  },
  {
    code: 'K92',
    name: 'Iné choroby tráviacej sústavy'
  },
  {
    code: 'K93',
    name: 'Choroby iných tráviacich orgánov pri chorobách zatriedených inde'
  },
  {
    code: 'L00',
    name: 'Syndróm obarenej kože vyvolaný stafylokokmi'
  },
  {
    code: 'L01',
    name: 'Impetigo'
  },
  {
    code: 'L02',
    name: 'Kožný absces, furunkul a karbunkul'
  },
  {
    code: 'L03',
    name: 'Celulitída – flegmóna'
  },
  {
    code: 'L04',
    name: 'Akútny zápal lymfatických uzlín – lymphadenitis acuta'
  },
  {
    code: 'L05',
    name: 'Dermoidná pararektálna (pilonidálna) cysta'
  },
  {
    code: 'L08',
    name: 'Iné lokálne infekcie kože a podkožného tkaniva'
  },
  {
    code: 'L10',
    name: 'Pemfigus'
  },
  {
    code: 'L11',
    name: 'Iné akantolytické dermatózy'
  },
  {
    code: 'L12',
    name: 'Pemfigoid'
  },
  {
    code: 'L13',
    name: 'Iné bulózne dermatózy'
  },
  {
    code: 'L14',
    name: 'Bulózne dermatózy pri chorobách zatriedených inde'
  },
  {
    code: 'L20',
    name: 'Atopická dermatitída'
  },
  {
    code: 'L21',
    name: 'Seboroická dermatitída'
  },
  {
    code: 'L22',
    name: 'Plienková dermatitída'
  },
  {
    code: 'L23',
    name: 'Alergická kontaktná dermatitída'
  },
  {
    code: 'L24',
    name: 'Iritačná kontaktná dermatitída'
  },
  {
    code: 'L25',
    name: 'Nešpecifikovaná kontaktná dermatitída'
  },
  {
    code: 'L26',
    name: 'Exfoliatívna dermatitída'
  },
  {
    code: 'L27',
    name: 'Dermatitída vyvolaná vnútorne užitými látkami'
  },
  {
    code: 'L28',
    name: 'Lišaj – lichen simplex chronicus a svrbľavka – prurigo'
  },
  {
    code: 'L29',
    name: 'Svrbenie – pruritus'
  },
  {
    code: 'L30',
    name: 'Iné dermatitídy'
  },
  {
    code: 'L40',
    name: 'Psoriáza'
  },
  {
    code: 'L41',
    name: 'Parapsoriáza'
  },
  {
    code: 'L42',
    name: 'Pityriasis rosea'
  },
  {
    code: 'L43',
    name: 'Lichen planus – plochý lišaj'
  },
  {
    code: 'L44',
    name: 'Iné papuloskvamózne choroby'
  },
  {
    code: 'L45',
    name: 'Papuloskvamózne dermatózy pri chorobách zatriedených inde'
  },
  {
    code: 'L50',
    name: 'Žihľavka – urticaria'
  },
  {
    code: 'L51',
    name: 'Erythema multiforme'
  },
  {
    code: 'L52',
    name: 'Erythema nodosum'
  },
  {
    code: 'L53',
    name: 'Iné erytémové choroby'
  },
  {
    code: 'L54',
    name: 'Erytém pri chorobách zatriedených inde'
  },
  {
    code: 'L55',
    name: 'Slnečný zápal – dermatitis solaris'
  },
  {
    code: 'L56',
    name: 'Iné akútne zmeny kože zavinené ultrafialovým žiarením'
  },
  {
    code: 'L57',
    name: 'Zmeny kože zavinené chronickým vystavením neionizujúcemu žiareniu'
  },
  {
    code: 'L58',
    name: 'Radiodermatitis'
  },
  {
    code: 'L59',
    name: 'Iné radiačné poškodenia kože a podkožného tkaniva'
  },
  {
    code: 'L60',
    name: 'Choroby nechtov'
  },
  {
    code: 'L62',
    name: 'Choroby nechtov pri chorobách zatriedených inde'
  },
  {
    code: 'L63',
    name: 'Alopecia areata – ložisková plešivosť'
  },
  {
    code: 'L64',
    name: 'Androgénna alopécia'
  },
  {
    code: 'L65',
    name: 'Iná nejazvová strata vlasov'
  },
  {
    code: 'L66',
    name: 'Jazvová alopécia [jazvová strata vlasov]'
  },
  {
    code: 'L67',
    name: 'Abnormality farby a tvaru vlasov'
  },
  {
    code: 'L68',
    name: 'Nadmerné ochlpenie – hypertrichosis'
  },
  {
    code: 'L70',
    name: 'Akné'
  },
  {
    code: 'L71',
    name: 'Rosacea'
  },
  {
    code: 'L72',
    name: 'Folikulárne cysty kože a podkožného tkaniva'
  },
  {
    code: 'L73',
    name: 'Iné choroby vlasových folikulov'
  },
  {
    code: 'L74',
    name: 'Choroby ekrinných potných žliaz'
  },
  {
    code: 'L75',
    name: 'Choroby apokrinných potných (pachových) žliaz'
  },
  {
    code: 'L80',
    name: 'Vitiligo'
  },
  {
    code: 'L81',
    name: 'Iné poruchy pigmentácie'
  },
  {
    code: 'L82',
    name: 'Keratosis seborrhoica'
  },
  {
    code: 'L83',
    name: 'Acanthosis nigricans'
  },
  {
    code: 'L84',
    name: 'Kurie oko – clavus a mozoľ – callus, tyloma'
  },
  {
    code: 'L85',
    name: 'Iné zhrubnutia epidermy'
  },
  {
    code: 'L86',
    name: 'Keratoderma pri chorobách zatriedených inde'
  },
  {
    code: 'L87',
    name: 'Choroby transepidermálneho vylučovania (eliminácie)'
  },
  {
    code: 'L88',
    name: 'Pyoderma gangrenosum'
  },
  {
    code: 'L89',
    name: 'Dekubitálny vred – preležanina'
  },
  {
    code: 'L90',
    name: 'Atrofické poruchy kože'
  },
  {
    code: 'L91',
    name: 'Hypertrofické poruchy kože'
  },
  {
    code: 'L92',
    name: 'Granulomatózne choroby kože a podkožného tkaniva'
  },
  {
    code: 'L93',
    name: 'Lupus erythematosus'
  },
  {
    code: 'L94',
    name: 'Iné lokalizované choroby spojivového tkaniva'
  },
  {
    code: 'L95',
    name: 'Vaskulitída ohraničená na kožu nezatriedená inde'
  },
  {
    code: 'L97',
    name: 'Vred dolnej končatiny nezatriedený inde'
  },
  {
    code: 'L98',
    name: 'Iné choroby kože a podkožného tkaniva nezatriedené inde'
  },
  {
    code: 'L99',
    name: 'Iné choroby kože a podkožného tkaniva pri chorobách zatriedených inde'
  },
  {
    code: 'M00',
    name: 'Pyogénna artritída'
  },
  {
    code: 'M01',
    name: 'Priame infekcie kĺbu pri infekčných a parazitárnych chorobách zatriedených inde'
  },
  {
    code: 'M02',
    name: 'Reaktívne artropatie'
  },
  {
    code: 'M03',
    name: 'Poinfekčné a reaktívne artropatie pri chorobách zatriedených inde'
  },
  {
    code: 'M05',
    name: 'Séropozitívna reumatoidná artritída'
  },
  {
    code: 'M06',
    name: 'Iná reumatoidná artritída'
  },
  {
    code: 'M07',
    name: 'Psoriatické a enteropatické artropatie'
  },
  {
    code: 'M08',
    name: 'Juvenilná artritída'
  },
  {
    code: 'M09',
    name: 'Juvenilná artritída pri chorobách zatriedených inde'
  },
  {
    code: 'M10',
    name: 'Lámka – arthritis urica'
  },
  {
    code: 'M11',
    name: 'Iné kryštálové artropatie'
  },
  {
    code: 'M12',
    name: 'Iné špecifické artropatie'
  },
  {
    code: 'M13',
    name: 'Iné artritídy'
  },
  {
    code: 'M14',
    name: 'Artropatie pri iných chorobách zatriedených inde'
  },
  {
    code: 'M15',
    name: 'Polyartróza'
  },
  {
    code: 'M16',
    name: 'Koxartróza [artróza bedrového kĺbu]'
  },
  {
    code: 'M17',
    name: 'Gonartróza [artróza kolenného kĺbu]'
  },
  {
    code: 'M18',
    name: 'Artróza prvého karpometakarpálneho kĺbu'
  },
  {
    code: 'M19',
    name: 'Iné artrózy'
  },
  {
    code: 'M20',
    name: 'Získané deformácie prstov (rúk) a palcov (nôh)'
  },
  {
    code: 'M21',
    name: 'Iné získané deformácie končatín'
  },
  {
    code: 'M22',
    name: 'Poruchy pately – jabĺčka'
  },
  {
    code: 'M23',
    name: 'Vnútorné poruchy kolenného kĺbu'
  },
  {
    code: 'M24',
    name: 'Iné špecifické poruchy kĺbov'
  },
  {
    code: 'M25',
    name: 'Iné poruchy kĺbov nezatriedené inde'
  },
  {
    code: 'M30',
    name: 'Polyarteritis nodosa a príbuzné choroby'
  },
  {
    code: 'M31',
    name: 'Iné nekrotizujúce vaskulopatie'
  },
  {
    code: 'M32',
    name: 'Systémový lupus erythematosus'
  },
  {
    code: 'M33',
    name: 'Dermatopolymyozitída'
  },
  {
    code: 'M34',
    name: 'Systémová skleróza'
  },
  {
    code: 'M35',
    name: 'Iné systémové postihnutie spojivového tkaniva'
  },
  {
    code: 'M36',
    name: 'Systémové choroby spojivového tkaniva pri chorobách zatriedených inde'
  },
  {
    code: 'M40',
    name: 'Kyfóza a lordóza'
  },
  {
    code: 'M41',
    name: 'Skolióza'
  },
  {
    code: 'M42',
    name: 'Osteochondróza chrbtice'
  },
  {
    code: 'M43',
    name: 'Iné deformujúce dorzopatie'
  },
  {
    code: 'M45',
    name: 'Spondylitis ankylosans'
  },
  {
    code: 'M46',
    name: 'Iné zápalové spondylopatie'
  },
  {
    code: 'M47',
    name: 'Spondylóza'
  },
  {
    code: 'M48',
    name: 'Iné spondylopatie'
  },
  {
    code: 'M49',
    name: 'Spondylopatie pri chorobách zatriedených inde'
  },
  {
    code: 'M50',
    name: 'Poruchy krčných medzistavcových platničiek'
  },
  {
    code: 'M51',
    name: 'Iné poruchy medzistavcových platničiek'
  },
  {
    code: 'M53',
    name: 'Iné dorzopatie nezatriedené inde'
  },
  {
    code: 'M54',
    name: 'Bolesť chrbtice – dorzalgia'
  },
  {
    code: 'M60',
    name: 'Myozitída'
  },
  {
    code: 'M61',
    name: 'Kalcifikácia a osifikácia svalu – vápenatenie a kostnatenie svalov'
  },
  {
    code: 'M62',
    name: 'Iné choroby svalu'
  },
  {
    code: 'M63',
    name: 'Choroby svalu pri chorobách zatriedených inde'
  },
  {
    code: 'M65',
    name: 'Synovitída a tendosynovitída'
  },
  {
    code: 'M66',
    name: 'Spontánne roztrhnutie synoviálnej membrány a šľachy'
  },
  {
    code: 'M67',
    name: 'Iné choroby synoviálnej membrány a šliach'
  },
  {
    code: 'M68',
    name: 'Choroby synoviálnej membrány a šliach pri chorobách zatriedených inde'
  },
  {
    code: 'M70',
    name: 'Choroby mäkkého tkaniva súvisiace s používaním, nadmerným používaním a tlakom'
  },
  {
    code: 'M71',
    name: 'Iné burzopatie'
  },
  {
    code: 'M72',
    name: 'Choroby fibroblastov'
  },
  {
    code: 'M73',
    name: 'Choroby mäkkého tkaniva pri chorobách zatriedených inde'
  },
  {
    code: 'M75',
    name: 'Poškodenia pleca – lézie pleca'
  },
  {
    code: 'M76',
    name: 'Entezopatie dolnej končatiny okrem nohy'
  },
  {
    code: 'M77',
    name: 'Iné entezopatie'
  },
  {
    code: 'M79',
    name: 'Iné choroby mäkkého tkaniva nezatriedené inde'
  },
  {
    code: 'M80',
    name: 'Osteoporóza s patologickou fraktúrou'
  },
  {
    code: 'M81',
    name: 'Osteoporóza bez patologickej fraktúry'
  },
  {
    code: 'M82',
    name: 'Osteoporóza pri chorobách zatriedených inde'
  },
  {
    code: 'M83',
    name: 'Osteomalácia dospelých'
  },
  {
    code: 'M84',
    name: 'Poruchy celistvosti kostí'
  },
  {
    code: 'M85',
    name: 'Iné poruchy hustoty a štruktúry kostí'
  },
  {
    code: 'M86',
    name: 'Osteomyelitída'
  },
  {
    code: 'M87',
    name: 'Osteonekróza'
  },
  {
    code: 'M88',
    name: 'Pagetova choroba kostí [osteitis deformans]'
  },
  {
    code: 'M89',
    name: 'Iné choroby kostí'
  },
  {
    code: 'M90',
    name: 'Osteopatie pri chorobách zatriedených inde'
  },
  {
    code: 'M91',
    name: 'Juvenilná osteochondróza bedra a panvy'
  },
  {
    code: 'M92',
    name: 'Iná juvenilná osteochondróza'
  },
  {
    code: 'M93',
    name: 'Iné osteochondropatie'
  },
  {
    code: 'M94',
    name: 'Iné choroby chrupky'
  },
  {
    code: 'M95',
    name: 'Iné získané deformácie svalovej a kostrovej sústavy'
  },
  {
    code: 'M96',
    name: 'Pozákrokové poruchy svalovej a kostrovej sústavy nezatriedené inde'
  },
  {
    code: 'M99',
    name: 'Biomechanické lézie nezatriedené inde'
  },
  {
    code: 'N00',
    name: 'Akútny nefritický syndróm'
  },
  {
    code: 'N01',
    name: 'Chytro progredujúci nefritický syndróm'
  },
  {
    code: 'N02',
    name: 'Návratná a pretrvávajúca hematúria'
  },
  {
    code: 'N03',
    name: 'Chronický nefritický syndróm'
  },
  {
    code: 'N04',
    name: 'Nefrotický syndróm'
  },
  {
    code: 'N05',
    name: 'Nešpecifikovaný nefritický syndróm'
  },
  {
    code: 'N06',
    name: 'Izolovaná proteinúria so špecifikovanými morfologickými zmenami'
  },
  {
    code: 'N07',
    name: 'Hereditárna nefropatia nezatriedená inde'
  },
  {
    code: 'N08',
    name: 'Glomerulárne choroby pri chorobách zatriedených inde'
  },
  {
    code: 'N10',
    name: 'Akútna tubulointersticiálna nefritída'
  },
  {
    code: 'N11',
    name: 'Chronická tubulointersticiálna nefritída'
  },
  {
    code: 'N12',
    name: 'Tubulointersticiálna nefritída nešpecifikovaná ako akútna alebo chronická'
  },
  {
    code: 'N13',
    name: 'Obštrukčná a refluxová uropatia'
  },
  {
    code: 'N14',
    name: 'Tubulointersticiálne a tubulárne poruchy zavinené liekmi alebo ťažkými kovmi'
  },
  {
    code: 'N15',
    name: 'Iné renálne tubulointersticiálne choroby'
  },
  {
    code: 'N16',
    name: 'Renálne tubulointersticiálne poruchy pri chorobách zatriedených inde'
  },
  {
    code: 'N17',
    name: 'Akútne zlyhanie obličiek'
  },
  {
    code: 'N18',
    name: 'Chronické zlyhanie obličiek'
  },
  {
    code: 'N19',
    name: 'Nešpecifikované zlyhanie obličiek'
  },
  {
    code: 'N20',
    name: 'Konkrement (kameň) obličky a močovodu – nephrolithiasis et ureterolithiasis'
  },
  {
    code: 'N21',
    name: 'Konkrement v dolných močových cestách'
  },
  {
    code: 'N22',
    name: 'Konkrement v močových cestách pri chorobách zatriedených inde'
  },
  {
    code: 'N23',
    name: 'Nešpecifikovaná obličková kolika'
  },
  {
    code: 'N25',
    name: 'Choroby zo zhoršenej obličkovej tubulárnej funkcie'
  },
  {
    code: 'N26',
    name: 'Nešpecifikovaná scvrknutá oblička'
  },
  {
    code: 'N27',
    name: 'Malá oblička z neznámej príčiny'
  },
  {
    code: 'N28',
    name: 'Iné choroby obličiek a močovodov nezatriedené inde'
  },
  {
    code: 'N29',
    name: 'Iné choroby obličiek a močovodov pri chorobách zatriedených inde'
  },
  {
    code: 'N30',
    name: 'Cystitída'
  },
  {
    code: 'N31',
    name: 'Neuromuskulárna dysfunkcia močového mechúra nezatriedená inde'
  },
  {
    code: 'N32',
    name: 'Iné choroby močového mechúra'
  },
  {
    code: 'N33',
    name: 'Choroby močového mechúra pri chorobách zatriedených inde'
  },
  {
    code: 'N34',
    name: 'Uretritída a uretrálny syndróm'
  },
  {
    code: 'N35',
    name: 'Striktúra uretry – zúženina močovej rúry'
  },
  {
    code: 'N36',
    name: 'Iné poruchy močovej rúry'
  },
  {
    code: 'N37',
    name: 'Poruchy močovej rúry pri chorobách zatriedených inde'
  },
  {
    code: 'N39',
    name: 'Iné choroby močovej sústavy'
  },
  {
    code: 'N40',
    name: 'Hyperplázia prostaty (predstojnice)'
  },
  {
    code: 'N41',
    name: 'Zápalové choroby prostaty'
  },
  {
    code: 'N42',
    name: 'Iné choroby prostaty'
  },
  {
    code: 'N43',
    name: 'Hydrokéla a spermatokéla'
  },
  {
    code: 'N44',
    name: 'Torzia semenníka'
  },
  {
    code: 'N45',
    name: 'Orchitída a epididymitída'
  },
  {
    code: 'N46',
    name: 'Mužská neplodnosť'
  },
  {
    code: 'N47',
    name: 'Hyperplastická predkožka, fimóza a parafimóza'
  },
  {
    code: 'N48',
    name: 'Iné choroby penisu'
  },
  {
    code: 'N49',
    name: 'Zápalové choroby mužských genitálií nezatriedené inde'
  },
  {
    code: 'N50',
    name: 'Iné choroby mužských pohlavných orgánov'
  },
  {
    code: 'N51',
    name: 'Choroby mužských pohlavných orgánov pri chorobách zatriedených inde'
  },
  {
    code: 'N60',
    name: 'Benígna dysplázia prsníka'
  },
  {
    code: 'N61',
    name: 'Zápalové choroby prsníka'
  },
  {
    code: 'N62',
    name: 'Hypertrofia prsníka'
  },
  {
    code: 'N63',
    name: 'Nešpecifikovaná hrčka v prsníku'
  },
  {
    code: 'N64',
    name: 'Iné choroby prsníka'
  },
  {
    code: 'N70',
    name: 'Zápaly vajíčkovodov a vaječníkov – salpingitis et oophoritis'
  },
  {
    code: 'N71',
    name: 'Zápalové choroby maternice okrem krčka'
  },
  {
    code: 'N72',
    name: 'Zápalové choroby krčka maternice'
  },
  {
    code: 'N73',
    name: 'Iné zápalové choroby ženských panvových orgánov'
  },
  {
    code: 'N74',
    name: 'Zápalové choroby ženských panvových orgánov pri chorobách zatriedených inde'
  },
  {
    code: 'N75',
    name: 'Choroby Bartholiniho žľazy'
  },
  {
    code: 'N76',
    name: 'Iné zápaly pošvy a vulvy'
  },
  {
    code: 'N77',
    name: 'Vulvovaginálna ulcerácia a zápal pri chorobách zatriedených inde'
  },
  {
    code: 'N80',
    name: 'Endometrióza'
  },
  {
    code: 'N81',
    name: 'Prolaps – vykĺznutie – ženských genitálií'
  },
  {
    code: 'N82',
    name: 'Fistuly – píšťale – ženských pohlavných orgánov'
  },
  {
    code: 'N83',
    name: 'Nezápalové choroby vaječníka, vajíčkovodu a širokého väzu maternice'
  },
  {
    code: 'N84',
    name: 'Polyp ženských pohlavných orgánov'
  },
  {
    code: 'N85',
    name: 'Iné nezápalové choroby maternice okrem krčka'
  },
  {
    code: 'N86',
    name: 'Erózia a ektrópium krčka maternice'
  },
  {
    code: 'N87',
    name: 'Dysplázia krčka maternice'
  },
  {
    code: 'N88',
    name: 'Iné nezápalové zmeny krčka maternice'
  },
  {
    code: 'N89',
    name: 'Iné nezápalové zmeny pošvy'
  },
  {
    code: 'N90',
    name: 'Iné nezápalové zmeny vulvy a hrádze'
  },
  {
    code: 'N91',
    name: 'Chýbajúca, slabá a zriedkavá menštruácia'
  },
  {
    code: 'N92',
    name: 'Nadmerná, častá a nepravidelná menštruácia'
  },
  {
    code: 'N93',
    name: 'Iné abnormálne maternicové a pošvové krvácanie'
  },
  {
    code: 'N94',
    name: 'Bolesť a iné odchýlky spojené so ženskými pohlavnými orgánmi a menštruačným cyklom'
  },
  {
    code: 'N95',
    name: 'Menopauzálne a iné perimenopauzálne poruchy'
  },
  {
    code: 'N96',
    name: 'Habituálne potrácanie'
  },
  {
    code: 'N97',
    name: 'Ženská neplodnosť'
  },
  {
    code: 'N98',
    name: 'Komplikácie spojené s umelým oplodnením'
  },
  {
    code: 'N99',
    name: 'Pozákrokové ochorenia močovopohlavných orgánov nezatriedené inde'
  },
  {
    code: 'O00',
    name: 'Mimomaternicová ťarchavosť'
  },
  {
    code: 'O01',
    name: 'Mola hydatidosa'
  },
  {
    code: 'O02',
    name: 'Iné abnormálne produkty koncepcie'
  },
  {
    code: 'O03',
    name: 'Spontánny potrat'
  },
  {
    code: 'O04',
    name: 'Medicínsky potrat'
  },
  {
    code: 'O05',
    name: 'Iný potrat'
  },
  {
    code: 'O06',
    name: 'Nešpecifikovaný potrat'
  },
  {
    code: 'O07',
    name: 'Neúspešný pokus o potrat'
  },
  {
    code: 'O08',
    name: 'Komplikácie po potrate a mimomaternicovej a molárnej ťarchavosti'
  },
  {
    code: 'O10',
    name: 'Predtým existujúca hypertenzia komplikujúca ťarchavosť, pôrod a popôrodie'
  },
  {
    code: 'O11',
    name: 'Predtým existujúca hypertenzná porucha so superponovanou proteinúriou'
  },
  {
    code: 'O12',
    name: 'Gestačný [ťarchavosťou vyvolaný] edém a proteinúria bez hypertenzie'
  },
  {
    code: 'O13',
    name: 'Gestačná [ťarchavosťou vyvolaná] hypertenzia bez významnej proteinúrie'
  },
  {
    code: 'O14',
    name: 'Gestačná [ťarchavosťou vyvolaná] hypertenzia s významnou proteinúriou'
  },
  {
    code: 'O15',
    name: 'Eklampsia'
  },
  {
    code: 'O16',
    name: 'Nešpecifikovaná hypertenzia matky'
  },
  {
    code: 'O20',
    name: 'Krvácanie vo včasnej ťarchavosti'
  },
  {
    code: 'O21',
    name: 'Nadmerné dávenie v ťarchavosti – hyperemesis gravidarum'
  },
  {
    code: 'O22',
    name: 'Žilové komplikácie v ťarchavosti'
  },
  {
    code: 'O23',
    name: 'Infekcie močovopohlavných orgánov v ťarchavosti'
  },
  {
    code: 'O24',
    name: 'Diabetes mellitus v ťarchavosti'
  },
  {
    code: 'O25',
    name: 'Podvýživa v ťarchavosti'
  },
  {
    code: 'O26',
    name: 'Starostlivosť o matku pre iné poruchy súvisiace najmä s ťarchavosťou'
  },
  {
    code: 'O28',
    name: 'Abnormálne nálezy pri predpôrodnom skríningu matky'
  },
  {
    code: 'O29',
    name: 'Komplikácie anestézie v ťarchavosti'
  },
  {
    code: 'O30',
    name: 'Viacplodová ťarchavosť'
  },
  {
    code: 'O31',
    name: 'Komplikácie špecifické pre viacplodovú ťarchavosť'
  },
  {
    code: 'O32',
    name: 'Starostlivosť o matku pri zistenom alebo suspektnom nepravidelnom naliehaní plodu'
  },
  {
    code: 'O33',
    name: 'Starostlivosť o matku pri zistenom alebo suspektnom nepomere (disproporcii)'
  },
  {
    code: 'O34',
    name: 'Starostlivosť o matku pri zistenej alebo suspektnej abnormalite panvových orgánov matky'
  },
  {
    code: 'O35',
    name: 'Starostlivosť o matku pri zistenej alebo suspektnej abnormalite a poškodení plodu'
  },
  {
    code: 'O36',
    name: 'Starostlivosť o matku pri iných zistených alebo suspektných problémoch s plodom'
  },
  {
    code: 'O40',
    name: 'Polyhydramnion'
  },
  {
    code: 'O41',
    name: 'Iné nepravidelnosti plodovej vody a blán'
  },
  {
    code: 'O42',
    name: 'Predčasné puknutie blán'
  },
  {
    code: 'O43',
    name: 'Nepravidelnosti placenty'
  },
  {
    code: 'O44',
    name: 'Placenta praevia – vcestná placenta'
  },
  {
    code: 'O45',
    name: 'Predčasné odlupovanie placenty [abruptio placentae]'
  },
  {
    code: 'O46',
    name: 'Krvácanie pred pôrodom nezatriedené inde'
  },
  {
    code: 'O47',
    name: 'Hroziaci predčasný pôrod'
  },
  {
    code: 'O48',
    name: 'Predľžená ťarchavosť'
  },
  {
    code: 'O60',
    name: 'Predčasný pôrod'
  },
  {
    code: 'O61',
    name: 'Neúspešná indukcia pôrodnej činnosti'
  },
  {
    code: 'O62',
    name: 'Nepravidelnosti pôrodnej činnosti'
  },
  {
    code: 'O63',
    name: 'Predĺžená pôrodná činnosť'
  },
  {
    code: 'O64',
    name: 'Komplikácie pôrodu zavinené nepravidelnou polohou a naliehaním plodu'
  },
  {
    code: 'O65',
    name: 'Komplikácie pôrodu zavinené abnormalitami panvy matky'
  },
  {
    code: 'O66',
    name: 'Iné komplikácie pôrodu'
  },
  {
    code: 'O67',
    name: 'Pôrodná činnosť a pôrod komplikovaný krvácaním pri pôrode nezatriedené inde'
  },
  {
    code: 'O68',
    name: 'Pôrodná činnosť a pôrod komplikovaný fetálnym distresom'
  },
  {
    code: 'O69',
    name: 'Pôrodná činnosť a pôrod komplikovaný nepravidelnosťami pupkovej šnúry'
  },
  {
    code: 'O70',
    name: 'Poranenie hrádze pri pôrode'
  },
  {
    code: 'O71',
    name: 'Iné pôrodné poranenie'
  },
  {
    code: 'O72',
    name: 'Krvácanie po pôrode'
  },
  {
    code: 'O73',
    name: 'Zadržanie placenty a blán bez krvácania'
  },
  {
    code: 'O74',
    name: 'Komplikácie anestézie počas pôrodnej činnosti a pri pôrode'
  },
  {
    code: 'O75',
    name: 'Iné komplikácie pôrodnej činnosti a pôrodu nezatriedené inde'
  },
  {
    code: 'O80',
    name: 'Spontánny pôrod jedného plodu'
  },
  {
    code: 'O81',
    name: 'Pôrod jedného plodu kliešťami a vákuumextraktorom'
  },
  {
    code: 'O82',
    name: 'Pôrod jedného plodu cisárskym rezom'
  },
  {
    code: 'O83',
    name: 'Iné vedenie pôrodu jedného plodu'
  },
  {
    code: 'O84',
    name: 'Pôrody pri viacplodovej ťarchavosti'
  },
  {
    code: 'O85',
    name: 'Puerperálna sepsa – popôrodná sepsa'
  },
  {
    code: 'O86',
    name: 'Iné puerperálne infekcie'
  },
  {
    code: 'O87',
    name: 'Žilové komplikácie v popôrodí'
  },
  {
    code: 'O88',
    name: 'Pôrodnícka embólia'
  },
  {
    code: 'O89',
    name: 'Komplikácie anestézie v popôrodí'
  },
  {
    code: 'O90',
    name: 'Komplikácie popôrodia nezatriedené inde'
  },
  {
    code: 'O91',
    name: 'Infekcie prsníka spojené s pôrodom'
  },
  {
    code: 'O92',
    name: 'Iné choroby prsníka a poruchy laktácie spojené s pôrodom'
  },
  {
    code: 'O95',
    name: 'Pôrodnícka smrť z nešpecifikovanej príčiny'
  },
  {
    code: 'O96',
    name: 'Smrť z akejkoľvek pôrodníckej príčiny po vyše 42 dňoch, ale menej ako po jednom roku po pôrode'
  },
  {
    code: 'O97',
    name: 'Smrť následkom priamych pôrodníckych príčin'
  },
  {
    code: 'O98',
    name: 'Infekčné a parazitárne choroby matky, ktoré sa môžu zatriediť inde, ale komplikujú ťarchavosť, pôrod a popôrodie'
  },
  {
    code: 'O99',
    name: 'Iné choroby matky, ktoré sa môžu zatriediť inde, ale komplikujú ťarchavosť, pôrod a popôrodie'
  },
  {
    code: 'P00',
    name: 'Ohrozenie plodu a novorodenca chorobami matky, ktoré nemusia súvisieť s terajšou ťarchavosťou'
  },
  {
    code: 'P01',
    name: 'Ohrozenie plodu a novorodenca komplikáciami ťarchavosti matky'
  },
  {
    code: 'P02',
    name: 'Ohrozenie plodu a novorodenca komplikáciami placenty, pupkovej šnúry a blán'
  },
  {
    code: 'P03',
    name: 'Ohrozenie plodu a novorodenca inými komplikáciami pôrodnej činnosti a pôrodu'
  },
  {
    code: 'P04',
    name: 'Ohrozenie plodu a novorodenca škodlivými vplyvmi prenesenými cez placentu alebo materské mlieko'
  },
  {
    code: 'P05',
    name: 'Nízka hmotnosť a podvýživa plodu'
  },
  {
    code: 'P07',
    name: 'Poruchy súvisiace so skrátenou ťarchavosťou a nízkou pôrodnou hmotnosťou nezatriedené inde'
  },
  {
    code: 'P08',
    name: 'Poruchy súvisiace s predĺženou ťarchavosťou a vysokou pôrodnou hmotnosťou'
  },
  {
    code: 'P10',
    name: 'Intrakraniálne natrhnutie a krvácanie zapríčinené poranením pri pôrode'
  },
  {
    code: 'P11',
    name: 'Iné pôrodné poranenia ústredného nervového systému'
  },
  {
    code: 'P12',
    name: 'Pôrodné poranenie vlasovej časti hlavy'
  },
  {
    code: 'P13',
    name: 'Pôrodné poranenie kostry'
  },
  {
    code: 'P14',
    name: 'Pôrodné poranenie periférneho nervového systému'
  },
  {
    code: 'P15',
    name: 'Iné poranenia pri pôrode'
  },
  {
    code: 'P20',
    name: 'Vnútromaternicová hypoxia'
  },
  {
    code: 'P21',
    name: 'Pôrodná asfyxia'
  },
  {
    code: 'P22',
    name: 'Syndróm respiračnej tvŕdze novorodenca'
  },
  {
    code: 'P23',
    name: 'Kongenitálna pneumónia'
  },
  {
    code: 'P24',
    name: 'Novorodenecké syndrómy z aspirácie'
  },
  {
    code: 'P25',
    name: 'Intersticiálny emfyzém a podobné poruchy vznikajúce v perinatálnej perióde'
  },
  {
    code: 'P26',
    name: 'Pľúcne krvácanie vznikajúce v perinatálnej perióde'
  },
  {
    code: 'P27',
    name: 'Chronická respiračná choroba vznikajúca v perinatálnej perióde'
  },
  {
    code: 'P28',
    name: 'Iné respiračné poruchy vznikajúce v perinatálnej perióde'
  },
  {
    code: 'P29',
    name: 'Kardiovaskulárne poruchy vznikajúce v perinatálnej perióde'
  },
  {
    code: 'P35',
    name: 'Kongenitálne vírusové choroby'
  },
  {
    code: 'P36',
    name: 'Bakteriálna sepsa novorodenca'
  },
  {
    code: 'P37',
    name: 'Iné kongenitálne infekčné a parazitárne choroby'
  },
  {
    code: 'P38',
    name: 'Omfalitída novorodenca s miernym krvácaním alebo bez neho'
  },
  {
    code: 'P39',
    name: 'Iné infekcie špecifické pre perinatálnu periódu'
  },
  {
    code: 'P50',
    name: 'Fetálna strata krvi'
  },
  {
    code: 'P51',
    name: 'Krvácanie z pupka u novorodenca'
  },
  {
    code: 'P52',
    name: 'Vnútrolebkové netraumatické krvácanie plodu a novorodenca'
  },
  {
    code: 'P53',
    name: 'Hemoragická choroba plodu a novorodenca'
  },
  {
    code: 'P54',
    name: 'Iné krvácania novorodenca'
  },
  {
    code: 'P55',
    name: 'Hemolytická choroba plodu a novorodenca'
  },
  {
    code: 'P56',
    name: 'Hydrops fetalis v dôsledku hemolytickej choroby'
  },
  {
    code: 'P57',
    name: 'Kernikterus'
  },
  {
    code: 'P58',
    name: 'Novorodenecká žltačka z inej nadmernej hemolýzy'
  },
  {
    code: 'P59',
    name: 'Novorodenecká žltačka z iných a nešpecifikovaných príčin'
  },
  {
    code: 'P60',
    name: 'Diseminovaná intravaskulárna koagulácia plodu a novorodenca'
  },
  {
    code: 'P61',
    name: 'Iné perinatálne hematologické poruchy'
  },
  {
    code: 'P70',
    name: 'Prechodné poruchy metabolizmu sacharidov špecifické pre plod a novorodenca'
  },
  {
    code: 'P71',
    name: 'Prechodné novorodenecké poruchy metabolizmu kalcia a magnézia'
  },
  {
    code: 'P72',
    name: 'Iné prechodné novorodenecké endokrinné poruchy'
  },
  {
    code: 'P74',
    name: 'Iné prechodné novorodenecké poruchy elektrolytov a metabolizmu'
  },
  {
    code: 'P75',
    name: 'Mekoniový ileus'
  },
  {
    code: 'P76',
    name: 'Iné črevné obštrukcie novorodenca'
  },
  {
    code: 'P77',
    name: 'Nekrotizujúca enterokolitída plodu a novorodenca'
  },
  {
    code: 'P78',
    name: 'Iné perinatálne choroby tráviacich orgánov'
  },
  {
    code: 'P80',
    name: 'Hypotermia novorodenca'
  },
  {
    code: 'P81',
    name: 'Iné poruchy regulácie teploty novorodenca'
  },
  {
    code: 'P83',
    name: 'Iné poruchy kože špecifické pre plod a novorodenca'
  },
  {
    code: 'P90',
    name: 'Kŕče novorodenca'
  },
  {
    code: 'P91',
    name: 'Iné poruchy mozgovej funkcie novorodenca'
  },
  {
    code: 'P92',
    name: 'Problémy s chovaním (”kŕmením”) novorodenca'
  },
  {
    code: 'P93',
    name: 'Reakcie na lieky a intoxikácie liekmi podávanými plodu a novorodencovi'
  },
  {
    code: 'P94',
    name: 'Poruchy svalového tonusu novorodenca'
  },
  {
    code: 'P95',
    name: 'Smrť plodu z nešpecifikovanej príčiny'
  },
  {
    code: 'P96',
    name: 'Iné choroby vznikajúce v perinatálnej perióde'
  },
  {
    code: 'Q00',
    name: 'Anencefalus a podobné vrodené chyby'
  },
  {
    code: 'Q01',
    name: 'Encefalokéla'
  },
  {
    code: 'Q02',
    name: 'Mikrocefalia'
  },
  {
    code: 'Q03',
    name: 'Kongenitálny hydrocefalus'
  },
  {
    code: 'Q04',
    name: 'Iné vrodené chyby mozgu'
  },
  {
    code: 'Q05',
    name: 'Spina bifida'
  },
  {
    code: 'Q06',
    name: 'Iné vrodené chyby miechy'
  },
  {
    code: 'Q07',
    name: 'Iné vrodené chyby nervového systému'
  },
  {
    code: 'Q10',
    name: 'Vrodené chyby mihalnice, slzných orgánov a očnice'
  },
  {
    code: 'Q11',
    name: 'Anoftalmus, mikroftalmus, makroftalmus'
  },
  {
    code: 'Q12',
    name: 'Vrodené chyby šošovky'
  },
  {
    code: 'Q13',
    name: 'Vrodené chyby predného segmentu oka'
  },
  {
    code: 'Q14',
    name: 'Vrodené chyby zadného segmentu oka'
  },
  {
    code: 'Q15',
    name: 'Iné vrodené chyby oka'
  },
  {
    code: 'Q16',
    name: 'Vrodené chyby ucha zapríčiňujúce zhoršenie počutia'
  },
  {
    code: 'Q17',
    name: 'Iné vrodené chyby ucha'
  },
  {
    code: 'Q18',
    name: 'Iné vrodené chyby tváre a krku'
  },
  {
    code: 'Q20',
    name: 'Vrodené chyby srdcových dutín a ich spojenia'
  },
  {
    code: 'Q21',
    name: 'Vrodené chyby srdcových priehradiek'
  },
  {
    code: 'Q22',
    name: 'Vrodené chyby pulmonálnej a trikuspidálnej chlopne'
  },
  {
    code: 'Q23',
    name: 'Vrodené chyby aortálnej a mitrálnej chlopne'
  },
  {
    code: 'Q24',
    name: 'Iné vrodené chyby srdca'
  },
  {
    code: 'Q25',
    name: 'Vrodené chyby veľkých artérií'
  },
  {
    code: 'Q26',
    name: 'Vrodené chyby veľkých žíl'
  },
  {
    code: 'Q27',
    name: 'Iné vrodené chyby periférnej cievnej sústavy'
  },
  {
    code: 'Q28',
    name: 'Iné vrodené chyby obehovej sústavy'
  },
  {
    code: 'Q30',
    name: 'Vrodené chyby nosa'
  },
  {
    code: 'Q31',
    name: 'Vrodené chyby hrtana'
  },
  {
    code: 'Q32',
    name: 'Vrodené chyby priedušnice a priedušiek'
  },
  {
    code: 'Q33',
    name: 'Vrodené chyby pľúc'
  },
  {
    code: 'Q34',
    name: 'Iné vrodené chyby dýchacích orgánov'
  },
  {
    code: 'Q35',
    name: 'Rázštep podnebia'
  },
  {
    code: 'Q36',
    name: 'Rázštep pery'
  },
  {
    code: 'Q37',
    name: 'Rázštep podnebia s rázštepom pery'
  },
  {
    code: 'Q38',
    name: 'Iné vrodené chyby jazyka, úst a hltana'
  },
  {
    code: 'Q39',
    name: 'Vrodené chyby pažeráka'
  },
  {
    code: 'Q40',
    name: 'Iné vrodené chyby hornej tráviacej rúry'
  },
  {
    code: 'Q41',
    name: 'Vrodené chýbanie, bezústie (atrézia) a zúženie tenkého čreva'
  },
  {
    code: 'Q42',
    name: 'Vrodené chýbanie, bezústie (atrézia) a zúženie hrubého čreva'
  },
  {
    code: 'Q43',
    name: 'Iné vrodené chyby čreva'
  },
  {
    code: 'Q44',
    name: 'Vrodené chyby žlčníka, žlčových vývodov a pečene'
  },
  {
    code: 'Q45',
    name: 'Iné vrodené chyby tráviacej sústavy'
  },
  {
    code: 'Q50',
    name: 'Vrodené chyby vaječníkov, vajíčkovodov a širokých väzov maternice'
  },
  {
    code: 'Q51',
    name: 'Vrodené chyby maternice a krčka maternice'
  },
  {
    code: 'Q52',
    name: 'Iné vrodené chyby ženských pohlavných orgánov'
  },
  {
    code: 'Q53',
    name: 'Nezostúpený semenník'
  },
  {
    code: 'Q54',
    name: 'Hypospádia'
  },
  {
    code: 'Q55',
    name: 'Iné vrodené chyby mužských pohlavných orgánov'
  },
  {
    code: 'Q56',
    name: 'Neurčité pohlavie a pseudohermafroditizmus'
  },
  {
    code: 'Q60',
    name: 'Agenéza a iné redukčné defekty obličiek'
  },
  {
    code: 'Q61',
    name: 'Cystická choroba obličiek'
  },
  {
    code: 'Q62',
    name: 'Vrodené obštrukčné chyby obličkovej panvičky a vrodené chyby močovodu'
  },
  {
    code: 'Q63',
    name: 'Iné vrodené chyby obličiek'
  },
  {
    code: 'Q64',
    name: 'Iné vrodené chyby močovej sústavy'
  },
  {
    code: 'Q65',
    name: 'Vrodené deformácie bedier'
  },
  {
    code: 'Q66',
    name: 'Vrodené deformácie nôh'
  },
  {
    code: 'Q67',
    name: 'Vrodené deformácie svalov a kostí hlavy, tváre, chrbtice a hrudníka'
  },
  {
    code: 'Q68',
    name: 'Iné vrodené deformácie svalov a kostí'
  },
  {
    code: 'Q69',
    name: 'Polydaktýlia'
  },
  {
    code: 'Q70',
    name: 'Syndaktýlia'
  },
  {
    code: 'Q71',
    name: 'Redukčné defekty hornej končatiny'
  },
  {
    code: 'Q72',
    name: 'Redukčné defekty dolnej končatiny'
  },
  {
    code: 'Q73',
    name: 'Redukčné defekty nešpecifikovanej končatiny'
  },
  {
    code: 'Q74',
    name: 'Iné vrodené chyby končatiny (končatín)'
  },
  {
    code: 'Q75',
    name: 'Iné vrodené chyby kostí lebky a tváre'
  },
  {
    code: 'Q76',
    name: 'Vrodené chyby chrbtice a kostí hrudníka'
  },
  {
    code: 'Q77',
    name: 'Osteochondrodysplázia s poruchami rastu dlhých kostí a chrbtice'
  },
  {
    code: 'Q78',
    name: 'Iné osteochondrodysplázie'
  },
  {
    code: 'Q79',
    name: 'Vrodené chyby svalov a kostí nezatriedené inde'
  },
  {
    code: 'Q80',
    name: 'Vrodená ichtyóza'
  },
  {
    code: 'Q81',
    name: 'Epidermolysis bullosa'
  },
  {
    code: 'Q82',
    name: 'Iné vrodené chyby kože'
  },
  {
    code: 'Q83',
    name: 'Vrodené chyby prsníka'
  },
  {
    code: 'Q84',
    name: 'Iné vrodené chyby spoločnej (kožnej) pokrývky (integumentum commune)'
  },
  {
    code: 'Q85',
    name: 'Fakomatózy nezatriedené inde'
  },
  {
    code: 'Q86',
    name: 'Syndrómy vrodených chýb zavinených známymi vonkajšími príčinami nezatriedené inde'
  },
  {
    code: 'Q87',
    name: 'Syndrómy iných špecifikovaných vrodených chýb postihujúce viaceré sústavy'
  },
  {
    code: 'Q89',
    name: 'Iné vrodené chyby nezatriedené inde'
  },
  {
    code: 'Q90',
    name: 'Downov syndróm'
  },
  {
    code: 'Q91',
    name: 'Edwardsov syndróm a Patauov syndróm'
  },
  {
    code: 'Q92',
    name: 'Iné trizómie a parciálne trizómie autozómov nezatriedené inde'
  },
  {
    code: 'Q93',
    name: 'Monozómie a delécie z autozómov nezatriedené inde'
  },
  {
    code: 'Q95',
    name: 'Vyvážená prestavba a štruktúrne markery nezatriedené inde'
  },
  {
    code: 'Q96',
    name: 'Turnerov syndróm'
  },
  {
    code: 'Q97',
    name: 'Iné anomálie pohlavných chromozómov, ženský fenotyp, nezatriedené inde'
  },
  {
    code: 'Q98',
    name: 'Iné anomálie pohlavných chromozómov, mužský fenotyp, nezatriedené inde'
  },
  {
    code: 'Q99',
    name: 'Iné chromozómové anomálie nezatriedené inde'
  },
  {
    code: 'R00',
    name: 'Poruchy srdcového rytmu'
  },
  {
    code: 'R01',
    name: 'Srdcové šelesty a iné srdcové zvuky'
  },
  {
    code: 'R02',
    name: 'Gangréna nezatriedená inde'
  },
  {
    code: 'R03',
    name: 'Abnormálne hodnoty krvného tlaku bez diagnostického zaradenia'
  },
  {
    code: 'R04',
    name: 'Krvácanie z dýchacích ciest'
  },
  {
    code: 'R05',
    name: 'Kašeľ'
  },
  {
    code: 'R06',
    name: 'Odchýlky dýchania'
  },
  {
    code: 'R07',
    name: 'Bolesť v hrdle a v hrudníku'
  },
  {
    code: 'R09',
    name: 'Iné subjektívne a objektívne príznaky postihnutia obehovej a dýchacej sústavy'
  },
  {
    code: 'R10',
    name: 'Bolesť v oblasti brucha a panvy'
  },
  {
    code: 'R11',
    name: 'Ťažoba – nauzea a dávenie – vomitus'
  },
  {
    code: 'R12',
    name: 'Pálenie záhy'
  },
  {
    code: 'R13',
    name: 'Dysfágia – ťažké prehĺtanie'
  },
  {
    code: 'R14',
    name: 'Flatulencia a podobné poruchy'
  },
  {
    code: 'R15',
    name: 'Fekálna inkontinencia – neudržanie stolice'
  },
  {
    code: 'R16',
    name: 'Hepatomegália a splenomegália nezatriedené inde'
  },
  {
    code: 'R17',
    name: 'Nešpecifikovaná žltačka'
  },
  {
    code: 'R18',
    name: 'Ascites – brušná vodnatieľka'
  },
  {
    code: 'R19',
    name: 'Iné subjektívne a objektívne príznaky chorôb tráviacej sústavy a brucha'
  },
  {
    code: 'R20',
    name: 'Poruchy kožnej citlivosti'
  },
  {
    code: 'R81',
    name: 'Glykozúria'
  },
  {
    code: 'R82',
    name: 'Iné abnormálne nálezy v moči'
  },
  {
    code: 'R83',
    name: 'Abnormálne nálezy v mozgovomiechovom moku'
  },
  {
    code: 'R84',
    name: 'Abnormálne nálezy vo vzorkách z dýchacích orgánov a z hrudníka'
  },
  {
    code: 'R85',
    name: 'Abnormálne nálezy vo vzorkách z tráviacich orgánov a z brušnej dutiny'
  },
  {
    code: 'R86',
    name: 'Abnormálne nálezy vo vzorkách z mužských pohlavných orgánov'
  },
  {
    code: 'R87',
    name: 'Abnormálne nálezy vo vzorkách zo ženských pohlavných orgánov'
  },
  {
    code: 'R89',
    name: 'Abnormálne nálezy vo vzorkách z iných orgánov, sústav a tkanív'
  },
  {
    code: 'R90',
    name: 'Abnormálne nálezy pri diagnostickom zobrazovaní centrálneho nervového systému'
  },
  {
    code: 'R91',
    name: 'Abnormálne nálezy pri diagnostickom zobrazovaní pľúc'
  },
  {
    code: 'R92',
    name: 'Abnormálne nálezy pri diagnostickom zobrazovaní prsníka'
  },
  {
    code: 'R93',
    name: 'Abnormálne nálezy pri diagnostickom zobrazovaní iných štruktúr tela'
  },
  {
    code: 'R94',
    name: 'Abnormálne výsledky funkčných vyšetrení'
  },
  {
    code: 'R95',
    name: 'Syndróm náhlej smrti dojčaťa'
  },
  {
    code: 'R96',
    name: 'Iná náhla smrť z neznámej príčiny'
  },
  {
    code: 'R98',
    name: 'Smrť bez svedkov'
  },
  {
    code: 'R99',
    name: 'Iné nepresne určené a nešpecifikované príčiny smrti'
  },
  {
    code: 'S00',
    name: 'Povrchové poranenie hlavy'
  },
  {
    code: 'S01',
    name: 'Otvorená rana hlavy'
  },
  {
    code: 'S02',
    name: 'Zlomenina lebky a tvárových kostí'
  },
  {
    code: 'S03',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov hlavy'
  },
  {
    code: 'S04',
    name: 'Poranenie hlavových nervov'
  },
  {
    code: 'S05',
    name: 'Poranenie oka a očnice'
  },
  {
    code: 'S06',
    name: 'Vnútrolebkové poranenie'
  },
  {
    code: 'S07',
    name: 'Drvivé poranenie hlavy'
  },
  {
    code: 'S08',
    name: 'Traumatická amputácia časti hlavy'
  },
  {
    code: 'S09',
    name: 'Iné a nepresne určené poranenia hlavy'
  },
  {
    code: 'S10',
    name: 'Povrchové poranenie krku'
  },
  {
    code: 'S11',
    name: 'Otvorená rana krku'
  },
  {
    code: 'S12',
    name: 'Zlomenina krčnej chrbtice'
  },
  {
    code: 'S13',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov krku'
  },
  {
    code: 'S14',
    name: 'Poranenie krčných nervov a krčnej miechy'
  },
  {
    code: 'S15',
    name: 'Poranenie ciev krku'
  },
  {
    code: 'S16',
    name: 'Poranenie svalov a šliach krku'
  },
  {
    code: 'S17',
    name: 'Drvivé poranenie krku'
  },
  {
    code: 'S18',
    name: 'Traumatická amputácia na krčnej úrovni'
  },
  {
    code: 'S19',
    name: 'Iné a bližšie neurčené poranenia krku'
  },
  {
    code: 'S20',
    name: 'Povrchové poranenie hrudníka'
  },
  {
    code: 'S21',
    name: 'Otvorená rana hrudníka'
  },
  {
    code: 'S22',
    name: 'Zlomenina rebra (rebier), mostíka a hrudníkovej chrbtice'
  },
  {
    code: 'S23',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov hrudníka'
  },
  {
    code: 'S24',
    name: 'Poranenie nervov a miechy na úrovni hrudníka'
  },
  {
    code: 'S25',
    name: 'Poranenie ciev hrudníka'
  },
  {
    code: 'S26',
    name: 'Poranenie srdca'
  },
  {
    code: 'S27',
    name: 'Poranenie iných a bližšie neurčených vnútrohrudníkových orgánov'
  },
  {
    code: 'S28',
    name: 'Drvivé poranenie hrudníka a traumatická amputácia časti hrudníka'
  },
  {
    code: 'S29',
    name: 'Iné a bližšie neurčené poranenia hrudníka'
  },
  {
    code: 'S30',
    name: 'Povrchové poranenie brucha, drieku a panvy'
  },
  {
    code: 'S31',
    name: 'Otvorená rana brucha, drieku a panvy'
  },
  {
    code: 'S32',
    name: 'Zlomenina driekovej chrbtice a panvy'
  },
  {
    code: 'S33',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov driekovej chrbtice a panvy'
  },
  {
    code: 'S34',
    name: 'Poranenie nervov a miechy na úrovni brucha, drieku a panvy'
  },
  {
    code: 'S35',
    name: 'Poranenie ciev na úrovni brucha, drieku a panvy'
  },
  {
    code: 'S36',
    name: 'Poranenie vnútrobrušných orgánov'
  },
  {
    code: 'S37',
    name: 'Poranenie panvových orgánov'
  },
  {
    code: 'S38',
    name: 'Drvivé poranenie a traumatická amputácia časti brucha, drieku a panvy'
  },
  {
    code: 'S39',
    name: 'Iné a nešpecifikované poranenia brucha, drieku a panvy'
  },
  {
    code: 'S40',
    name: 'Povrchové poranenie pleca a ramena'
  },
  {
    code: 'S41',
    name: 'Otvorená rana pleca a ramena'
  },
  {
    code: 'S42',
    name: 'Zlomenina pleca a ramena'
  },
  {
    code: 'S43',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov plecového pletenca'
  },
  {
    code: 'S44',
    name: 'Poranenie nervov na úrovni pleca a ramena'
  },
  {
    code: 'S45',
    name: 'Poranenie krvných ciev na úrovni pleca a ramena'
  },
  {
    code: 'S46',
    name: 'Poranenie svalu a šľachy na úrovni pleca a ramena'
  },
  {
    code: 'S47',
    name: 'Drvivé poranenie pleca a ramena'
  },
  {
    code: 'S48',
    name: 'Traumatická amputácia pleca a ramena'
  },
  {
    code: 'S49',
    name: 'Iné a nešpecifikované poranenia pleca a ramena'
  },
  {
    code: 'S50',
    name: 'Povrchové poranenie lakťa a predlaktia'
  },
  {
    code: 'S51',
    name: 'Otvorená rana predlaktia'
  },
  {
    code: 'S52',
    name: 'Zlomenina predlaktia'
  },
  {
    code: 'S53',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov lakťa'
  },
  {
    code: 'S54',
    name: 'Poranenie nervov na úrovni predlaktia'
  },
  {
    code: 'S55',
    name: 'Poranenie ciev na úrovni predlaktia'
  },
  {
    code: 'S56',
    name: 'Poranenie svalu a šľachy na úrovni predlaktia'
  },
  {
    code: 'S57',
    name: 'Drvivé poranenie predlaktia'
  },
  {
    code: 'S58',
    name: 'Traumatická amputácia lakťa a predlaktia'
  },
  {
    code: 'S59',
    name: 'Iné a nešpecifikované poranenia predlaktia'
  },
  {
    code: 'S60',
    name: 'Povrchové poranenie zápästia a ruky'
  },
  {
    code: 'S61',
    name: 'Otvorená rana zápästia a ruky'
  },
  {
    code: 'S62',
    name: 'Zlomenina na úrovni zápästia a ruky'
  },
  {
    code: 'S63',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov na úrovni zápästia a ruky'
  },
  {
    code: 'S64',
    name: 'Poranenie nervov na úrovni zápästia a ruky'
  },
  {
    code: 'S65',
    name: 'Poranenie ciev na úrovni zápästia a ruky'
  },
  {
    code: 'S66',
    name: 'Poranenie svalu a šľachy na úrovni zápästia a ruky'
  },
  {
    code: 'S67',
    name: 'Drvivé poranenie zápästia a ruky'
  },
  {
    code: 'S68',
    name: 'Traumatická amputácia na úrovni zápästia a ruky'
  },
  {
    code: 'S69',
    name: 'Iné a nešpecifikované poranenia zápästia a ruky'
  },
  {
    code: 'S70',
    name: 'Povrchové poranenie bedier a stehna'
  },
  {
    code: 'S71',
    name: 'Otvorená rana bedier a stehna'
  },
  {
    code: 'S72',
    name: 'Zlomenina stehnovej kosti'
  },
  {
    code: 'S73',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbu a väzov bedier'
  },
  {
    code: 'S74',
    name: 'Poranenie nervov na úrovni bedier a stehna'
  },
  {
    code: 'S75',
    name: 'Poranenie ciev na úrovni bedier a stehna'
  },
  {
    code: 'S76',
    name: 'Poranenie svalu a šľachy na úrovni bedier a stehna'
  },
  {
    code: 'S77',
    name: 'Drvivé poranenie bedier a stehna'
  },
  {
    code: 'S78',
    name: 'Traumatická amputácia bedier a stehna'
  },
  {
    code: 'S79',
    name: 'Iné a nešpecifikované poranenia bedier a stehna'
  },
  {
    code: 'S80',
    name: 'Povrchové poranenie predkolenia'
  },
  {
    code: 'S81',
    name: 'Otvorená rana predkolenia'
  },
  {
    code: 'S82',
    name: 'Zlomenina predkolenia vrátane členka'
  },
  {
    code: 'S83',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov kolena'
  },
  {
    code: 'S84',
    name: 'Poranenie nervov na úrovni predkolenia'
  },
  {
    code: 'S85',
    name: 'Poranenie ciev na úrovni predkolenia'
  },
  {
    code: 'S86',
    name: 'Poranenie svalu a šľachy na úrovni predkolenia'
  },
  {
    code: 'S87',
    name: 'Drvivé poranenie predkolenia'
  },
  {
    code: 'S88',
    name: 'Traumatická amputácia predkolenia'
  },
  {
    code: 'S89',
    name: 'Iné a nešpecifikované poranenia predkolenia'
  },
  {
    code: 'S90',
    name: 'Povrchové poranenie členka a nohy'
  },
  {
    code: 'S91',
    name: 'Otvorená rana členka a nohy'
  },
  {
    code: 'S92',
    name: 'Zlomenina nohy (okrem členkového kĺbu)'
  },
  {
    code: 'S93',
    name: 'Vykĺbenie, vyvrtnutie a natiahnutie kĺbov a väzov členkového kĺbu a nohy'
  },
  {
    code: 'S94',
    name: 'Poranenie nervov na úrovni členkového kĺbu a nohy'
  },
  {
    code: 'S95',
    name: 'Poranenie ciev na úrovni členkového kĺbu a nohy'
  },
  {
    code: 'S96',
    name: 'Poranenie svalu a šľachy na úrovni členkového kĺbu a nohy'
  },
  {
    code: 'S97',
    name: 'Drvivé poranenie členkového kĺbu a nohy'
  },
  {
    code: 'S98',
    name: 'Traumatická amputácia členkového kĺbu a nohy'
  },
  {
    code: 'S99',
    name: 'Iné a nešpecifikované poranenia členkového kĺbu a nohy'
  },
  {
    code: 'T00',
    name: 'Povrchové poranenia viacerých oblastí tela'
  },
  {
    code: 'T01',
    name: 'Otvorené rany na viacerých oblastiach tela'
  },
  {
    code: 'T02',
    name: 'Zlomeniny postihujúce viaceré oblasti tela'
  },
  {
    code: 'T03',
    name: 'Vykĺbenia, vyvrtnutia a natiahnutia postihujúce viaceré oblasti tela'
  },
  {
    code: 'T04',
    name: 'Drvivé poranenia postihujúce viaceré oblasti tela'
  },
  {
    code: 'T05',
    name: 'Traumatické amputácie postihujúce viaceré oblasti tela'
  },
  {
    code: 'T06',
    name: 'Iné poranenia postihujúce viaceré oblasti tela nezatriedené inde'
  },
  {
    code: 'T07',
    name: 'Bližšie neurčené viacnásobné poranenia'
  },
  {
    code: 'T08',
    name: 'Zlomenina chrbtice na bližšie neurčenej úrovni'
  },
  {
    code: 'T09',
    name: 'Iné poranenia chrbtice a trupu na bližšie neurčenej úrovni'
  },
  {
    code: 'T10',
    name: 'Zlomenina hornej končatiny na bližšie neurčenej úrovni'
  },
  {
    code: 'T11',
    name: 'Iné poranenia hornej končatiny na bližšie neurčenej úrovni'
  },
  {
    code: 'T12',
    name: 'Zlomenina dolnej končatiny na bližšie neurčenej úrovni'
  },
  {
    code: 'T13',
    name: 'Iné poranenia dolnej končatiny na bližšie neurčenej úrovni'
  },
  {
    code: 'T14',
    name: 'Poranenie bližšie neurčenej oblasti tela'
  },
  {
    code: 'T15',
    name: 'Cudzie teleso vo vonkajšom oku'
  },
  {
    code: 'T16',
    name: 'Cudzie teleso v uchu'
  },
  {
    code: 'T17',
    name: 'Cudzie teleso v dýchacej sústave'
  },
  {
    code: 'T18',
    name: 'Cudzie teleso v tráviacej sústave'
  },
  {
    code: 'T19',
    name: 'Cudzie teleso v močovopohlavnej sústave'
  },
  {
    code: 'T20',
    name: 'Popálenina a poleptanie hlavy a krku'
  },
  {
    code: 'T21',
    name: 'Popálenina a poleptanie trupu'
  },
  {
    code: 'T22',
    name: 'Popálenina a poleptanie pleca a hornej končatiny okrem zápästia a ruky'
  },
  {
    code: 'T23',
    name: 'Popálenina a poleptanie zápästia a ruky'
  },
  {
    code: 'T24',
    name: 'Popálenina a poleptanie bedier a dolnej končatiny okrem členkového kĺbu a nohy'
  },
  {
    code: 'T25',
    name: 'Popálenina a poleptanie členkového kĺbu a nohy'
  },
  {
    code: 'T26',
    name: 'Popálenina a poleptanie ohraničené na oko a jeho adnexy'
  },
  {
    code: 'T27',
    name: 'Popálenina a poleptanie dýchacích orgánov'
  },
  {
    code: 'T28',
    name: 'Popálenina a poleptanie iných vnútorných orgánov'
  },
  {
    code: 'T29',
    name: 'Popáleniny a poleptania viacerých oblastí tela'
  },
  {
    code: 'T30',
    name: 'Popálenina a poleptanie bližšie neurčenej oblasti tela'
  },
  {
    code: 'T31',
    name: 'Popáleniny klasifikované podľa rozsahu postihnutého povrchu tela'
  },
  {
    code: 'T32',
    name: 'Poleptania klasifikované podľa rozsahu postihnutého povrchu tela'
  },
  {
    code: 'T33',
    name: 'Povrchová omrzlina'
  },
  {
    code: 'T34',
    name: 'Omrzlina s nekrózou tkaniva'
  },
  {
    code: 'T35',
    name: 'Omrzlina postihujúca viaceré oblasti tela a bližšie neurčená omrzlina'
  },
  {
    code: 'T36',
    name: 'Otrava systémovými antibiotikami'
  },
  {
    code: 'T37',
    name: 'Otrava inými celkovo účinkujúcimi antiinfekčnými a antiparazitárnymi prostriedkami'
  },
  {
    code: 'T38',
    name: 'Otrava hormónmi, ich syntetickými náhradami a antagonistami nezatriedená inde'
  },
  {
    code: 'T39',
    name: 'Otrava neopiátovými analgetikami, antipyretikami a antireumatikami'
  },
  {
    code: 'T40',
    name: 'Otrava opiátmi a psychodysleptikami [halucinogénmi]'
  },
  {
    code: 'T41',
    name: 'Otrava anestetikami a liečebnými plynmi'
  },
  {
    code: 'T42',
    name: 'Otrava antiepileptikami, sedatívami, hypnotikami a antiparkinsonikami'
  },
  {
    code: 'T43',
    name: 'Otrava psychotropnými liekmi nezatriedená inde'
  },
  {
    code: 'T44',
    name: 'Otrava liekmi účinkujúcimi najmä na autonómny nervový systém'
  },
  {
    code: 'T45',
    name: 'Otrava látkami účinkujúcimi najmä celkovo a na zložky krvi nezatriedená inde'
  },
  {
    code: 'T46',
    name: 'Otrava látkami účinkujúcimi najmä na obehovú sústavu'
  },
  {
    code: 'T47',
    name: 'Otrava látkami účinkujúcimi najmä na tráviacu sústavu'
  },
  {
    code: 'T48',
    name: 'Otrava látkami účinkujúcimi najmä na hladké a kostrové svaly a na dýchaciu sústavu'
  },
  {
    code: 'T49',
    name: 'Otrava látkami účinkujúcimi miestne, najmä na kožu a sliznice a oftalmologikami, otorinolaryngologikami a stomatologikami'
  },
  {
    code: 'T50',
    name: 'Otrava diuretikami a inými bližšie neurčenými liečivami, liekmi a biologickými látkami'
  },
  {
    code: 'T51',
    name: 'Toxický účinok alkoholu'
  },
  {
    code: 'T52',
    name: 'Toxický účinok organických rozpúšťadiel'
  },
  {
    code: 'T53',
    name: 'Toxický účinok halogénových derivátov alifatických a aromatických uhľovodíkov'
  },
  {
    code: 'T54',
    name: 'Toxický účinok leptavých látok'
  },
  {
    code: 'T55',
    name: 'Toxický účinok mydiel a detergencií'
  },
  {
    code: 'T56',
    name: 'Toxický účinok kovov'
  },
  {
    code: 'T57',
    name: 'Toxický účinok iných anorganických látok'
  },
  {
    code: 'T58',
    name: 'Toxický účinok oxidu uhoľnatého (CO)'
  },
  {
    code: 'T59',
    name: 'Toxický účinok iných plynov, dymov a výparov'
  },
  {
    code: 'T60',
    name: 'Toxický účinok pesticídov'
  },
  {
    code: 'T61',
    name: 'Toxický účinok škodlivých látok požitých ako morská potrava'
  },
  {
    code: 'T62',
    name: 'Toxický účinok iných škodlivých látok požitých ako potrava'
  },
  {
    code: 'T63',
    name: 'Toxický účinok styku s jedovatými zvieratami'
  },
  {
    code: 'T64',
    name: 'Toxický účinok aflatoxínu a iných mykotoxínov znečisťujúcich potravu'
  },
  {
    code: 'T65',
    name: 'Toxický účinok iných a bližšie neurčených látok'
  },
  {
    code: 'T66',
    name: 'Bližšie neurčené účinky žiarenia'
  },
  {
    code: 'T67',
    name: 'Účinky tepla a svetla'
  },
  {
    code: 'T68',
    name: 'Podchladenie'
  },
  {
    code: 'T69',
    name: 'Iné účinky zníženej teploty'
  },
  {
    code: 'T70',
    name: 'Účinky tlaku vzduchu a tlaku vody'
  },
  {
    code: 'T71',
    name: 'Zadusenie'
  },
  {
    code: 'T73',
    name: 'Účinky iných nedostatkov (deprivácií)'
  },
  {
    code: 'T74',
    name: 'Syndrómy zo zlého zaobchádzania'
  },
  {
    code: 'T75',
    name: 'Účinky iných vonkajších príčin'
  },
  {
    code: 'T78',
    name: 'Nepriaznivé účinky nezatriedené inde'
  },
  {
    code: 'T79',
    name: 'Niektoré včasné komplikácie úrazov nezatriedené inde'
  },
  {
    code: 'T80',
    name: 'Komplikácie po infúzii, transfúzii a liečebnej injekcii'
  },
  {
    code: 'T81',
    name: 'Komplikácie po výkonoch nezatriedené inde'
  },
  {
    code: 'T82',
    name: 'Komplikácie srdcových a cievnych protetických pomôcok, implantátov a štepov'
  },
  {
    code: 'T83',
    name: 'Komplikácie močovopohlavných protetických pomôcok, implantátov a štepov'
  },
  {
    code: 'T84',
    name: 'Komplikácie vnútorných ortopedických protetických pomôcok, implantátov a štepov'
  },
  {
    code: 'T85',
    name: 'Komplikácie iných vnútorných protetických pomôcok, implantátov a štepov'
  },
  {
    code: 'T86',
    name: 'Zlyhanie a odvrhnutie transplantovaných orgánov a tkanív'
  },
  {
    code: 'T87',
    name: 'Komplikácie charakteristické pre znovapripojenie (replantáciu) a amputáciu'
  },
  {
    code: 'T88',
    name: 'Iné komplikácie lekárskej a zdravotníckej starostlivosti nezatriedené inde'
  },
  {
    code: 'T90',
    name: 'Neskoré následky poranení hlavy'
  },
  {
    code: 'T91',
    name: 'Neskoré následky poranení krku a trupu'
  },
  {
    code: 'T92',
    name: 'Neskoré následky poranení hornej končatiny'
  },
  {
    code: 'T93',
    name: 'Neskoré následky poranení dolnej končatiny'
  },
  {
    code: 'T94',
    name: 'Neskoré následky poranení viacerých a bližšie neurčených oblastí tela'
  },
  {
    code: 'T95',
    name: 'Neskoré následky popálenín, poleptaní a omrzlín'
  },
  {
    code: 'T96',
    name: 'Neskoré následky otráv liečivami, liekmi a biologickými látkami'
  },
  {
    code: 'T97',
    name: 'Neskoré následky toxických účinkov látok používaných najmä mimo lekárstva'
  },
  {
    code: 'T98',
    name: 'Neskoré následky iných a bližšie neurčených účinkov vonkajších príčin'
  },
  {
    code: 'V01',
    name: 'Poranenie chodca pri zrážke s bicyklistom'
  }
];
