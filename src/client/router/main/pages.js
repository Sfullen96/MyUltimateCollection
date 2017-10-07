import * as account from '../../components/views/account';
import * as activity from '../../components/views/activity';
import * as candidates from '../../components/views/candidates';
import * as admin from '../../components/views/overview';
import * as common from '../../components/common';
import * as jobs from '../../components/views/jobs';

export const Account = ({
    Login: account.Login,
    Register: account.Register,
    ResetPassword: account.ResetPassword,
});

export const Activity = ({
    JobActivityOverview: activity.JobActivityOverview,
    SingleJobActivity: activity.SingleJobActivity,
    SingleJobViews: activity.SingleJobViews,
    SingleJobApplications: activity.SingleJobApplications,
});

export const Admin = ({
    AccountPreferences: admin.AccountPreferences,
    AccountOverview: admin.AccountOverview,
});

export const Candidates = ({
	AllCandidates: candidates.Candidates,
	SingleCandidate: candidates.SingleCandidate,
});

export const Common = ({
    Home: common.Home,
	NotFound: common.NotFound,
});

export const Jobs = ({
    AllJobs: jobs.Jobs,
    PostJob: jobs.PostJob,
    SingleJob: jobs.SingleJob,
});
