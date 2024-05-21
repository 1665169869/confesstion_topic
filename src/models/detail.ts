export interface DetailRequestModel {
	id: number;
}

export interface DetailResponseModel {
	code: number;
	message: string;
	data?: DetailDataResponseModel;
}

export interface DetailDataResponseModel {
	id: number;
	createTime: Date;
	updateTime: Date;
	content: string;
	userId: number;
	status: number;
	likeCount: number;
	commentCount: number;
	clickCount: number;
	nickName: string;
	avatarUrl: string;
}
