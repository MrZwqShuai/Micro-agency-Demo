import '../../css/personal.css';
import { PersonalInfoService } from '../service/personalInfoService';
interface IGender {
	boy: string;
	girl: string;
}
interface IResponse {
	data: object;
	status: number;
	config: object;
	statusText?: string;
}
class PersonalInfoController {
	static $inject: Array<string> = ['$scope', '$http', '$location', 'personalInfoService'];
	public gender: IGender = {
		boy: '男',
		girl: '女'
	};
	constructor(private $scope: ng.IScope, private $http: ng.IHttpService, private $location: ng.ILocationService, private personalInfoService: PersonalInfoService) {
		$scope.gender = {
			touched: false
		};
		$scope.genderSelect = () => {
			this.genderSelect();
		};
		$scope.getCancel = () => {
			this.getCancel();
		};
		$scope.sex = {
			boy: this.gender.boy,
			girl: this.gender.girl
		};
		$scope.personal = {
			gender: '男'
		};
		//设置性别
		$scope.choiceGender = (gender) => {

			let url = this.$location.path();
			console.log(gender, url);
			this.getCancel();
			$scope.personal.gender = gender;
			$http.put(url, { gender: gender }).then((response): void => {
				console.log('修改成功', response);
			});
		};
		// $scope.defaultBio = personalInfoService.bio;
		$scope.bio = {
			description: $scope.defaultBio
		};
		$scope.personalDes = this.personalDes;
		$scope.descriptionEdit = false;
		$scope.bioEdit = this.bioEdit;
		//简介设置保存
		$scope.completeEdit = (bios: string | number) => {
			$scope.descriptionEdit = false;
			console.log(bios);
			$scope.defaultBio = bios;
			let url = $location.path();
			console.log(url);
			$http.put(url, { bios: bios }).then((response) => {
				console.log(response);
			})
		};
		//nickname设置
		$scope.nickname = personalInfoService.nickname;
	} s
	$onInit() {
		this.getBaseInformation();
	}
	genderSelect() {
		console.log(0);
		this.$scope.gender = {
			touched: true
		};
	}
	getCancel() {
		this.$scope.gender = {
			touched: false
		};
	}
	choiceGender(this: any, gender: string) {
		console.log(gender);
		this.getCancel();
		this.personal.gender = gender;
	}
	personalDes(description: string | number) {
		if (typeof description === 'string' || typeof description === 'number') {
			console.log(description);
		}
	}
	bioEdit(this: any) {
		this.descriptionEdit = true;
	}
	getBaseInformation() {
		let url = this.$location.path();
		this.$http.get(url).then((response: any) => {
			let baseInformation = response.data.userInfo;
			this.$scope.defaultBio = baseInformation.bio;
			this.$scope.personal = {
				gender: baseInformation.gender
			};
			this.$scope.bio = {
				description: baseInformation.bio
			}
			console.log(baseInformation);
		});
	}
}
export { PersonalInfoController }