@extends('admin.admin_dashboard')
@section('admin')

<!-- jQuery Google CDN via W3schools.com -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

<style>
    /* Define a CSS class for input fields with a white background and black font color */
    .custom-input {
        background: whitesmoke;
        color: black;
    }


     
</style>

<div class="page-content">
    <nav class="page-breadcrumb">
        <ol class="breadcrumb">
            <a href="{{ route('barangay.blotter.records') }}" class="btn btn-inverse-primary" data-bs-toggle="tooltip" data-bs-placement="right" title="Back">Back</a>
        </ol>
    </nav>
    <div class="row">
        <div class="col-md-12 stretch-card">
            <div class="card">
                <div class="card-body" style="background-color: white;">
                    <h6 class="card-title">View Blotter Record</h6>
                    <form method="POST" action="" class="forms-sample">
                        @csrf

                        <input type="hidden" name="id" value="{{ $view_blotter_record->id }}">

                        <legend>Incident's Information</legend>
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="mb-3">
                                    <label class="form-label">Nature of Cases</label>
                                    <select name="nature_cases" class="form-select mb-3 form-control custom-input @error('nature_cases') is-invalid @enderror">
                                        <option value="" selected disabled>Select nature of cases</option>
                                        <option value="Criminal" {{ old('nature_cases', $view_blotter_record->nature_cases) === 'Criminal' ? 'selected' : '' }}>Criminal</option>
                                        <option value="Civil" {{ old('nature_cases', $view_blotter_record->nature_cases) === 'Civil' ? 'selected' : '' }}>Civil</option>
                                        <option value="Other" {{ old('nature_cases', $view_blotter_record->nature_cases) === 'Other' ? 'selected' : '' }}>Other</option>
                                    </select>
                                    @error('nature_cases')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>      
                            </div><!-- Col -->
                            <div class="col-sm-4">
                                <div class="mb-3">
                                    <label class="form-label">Schedule of Mediation</label>
                                    <div class="input-group">
                                        <input type="datetime" id="incident_date" name="incident_date" class="form-control custom-input flatpickr-input active @error('schd_mediation') is-invalid @enderror" placeholder="Select date" readonly="readonly" value="{{ $view_blotter_record->schd_mediation }}" readonly disabled style="background: whitesmoke; color:black;">
                                        <span class="input-group-text input-group-addon" data-toggle="">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                        </span>
                                    </div>
                                    @error('schd_mediation')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->
                            <div class="col-sm-4">
                                <div class="mb-3">
                                    <label class="form-label">Status</label>
                                    <select name="status" class="form-select mb-3 form-control custom-input @error('status') is-invalid @enderror">
                                        <option value="" selected disabled>Select status</option>
                                        <option value="Pending" {{ old('status', $view_blotter_record->status) === 'Pending' ? 'selected' : '' }}>Pending</option>
                                        <option value="Finished" {{ old('status', $view_blotter_record->status) === 'Finished' ? 'selected' : '' }}>Finished</option>
                                    </select>
                                    @error('incident_status')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->

                            <div class="col-sm-12">
                                <div class="mb-3">
                                    <label class="form-label">Complain's Details</label>
                                    <textarea name="complains_details" placeholder="Enter complains details" rows="6" class="form-control custom-input @error('complains_details') is-invalid @enderror" readonly>{{ old('complains_details', $view_blotter_record->complains_details) }}</textarea>
                                    @error('complains_details')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->
                        </div><!-- Row -->

                        <div class="row">
                            <legend>Complainant's Information</legend>
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label class="form-label">Complainant Name</label>
                                    <input type="text" name="complainant_name" placeholder="Enter complainant name" class="form-control custom-input @error('complainant_name') is-invalid @enderror" value="{{ $view_blotter_record->complainant_name }}" readonly>
                                    @error('complainant_name')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label class="form-label">Complainant Address</label>
                                    <input type="text" name="complainant_address" placeholder="Enter complainant address" class="form-control custom-input @error('complainant_address') is-invalid @enderror" value="{{ $view_blotter_record->complainant_address }}" readonly>
                                    @error('complainant_address')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->
                            <legend>Respondent's Information</legend>
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label class="form-label">Respondent Name</label>
                                    <input type="text" name="respondent_name" placeholder="Enter respondent name" class="form-control custom-input @error('respondent_name') is-invalid @enderror" value="{{ $view_blotter_record->respondent_name }}" readonly>
                                    @error('respondent_name')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label class="form-label">Respondent Address</label>
                                    <input type="text" name="respondent_address" placeholder="Enter respondent address" class="form-control custom-input @error('respondent_address') is-invalid @enderror" value="{{ $view_blotter_record->respondent_address }}" readonly>
                                    @error('respondent_address')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label class="form-label">Settled Cases</label>
                                    <select name="settled_cases" class="form-select mb-3 form-control custom-input @error('settled_cases') is-invalid @enderror">
                                        <option value="" selected disabled>Select settled cases</option>
                                        <option value="None" {{ old('settled_cases', $view_blotter_record->settled_cases) === 'None' ? 'selected' : '' }}>None</option>
                                        <option value="Mediation" {{ old('settled_cases', $view_blotter_record->settled_cases) === 'Mediation' ? 'selected' : '' }}>Mediation</option>
                                        <option value="Conciliated" {{ old('settled_cases', $view_blotter_record->settled_cases) === 'Conciliated' ? 'selected' : '' }}>Conciliated</option>
                                        <option value="Arbitration" {{ old('settled_cases', $view_blotter_record->settled_cases) === 'Arbitration' ? 'selected' : '' }}>Arbitration</option>
                                        
                                    </select>
                                    @error('settled_cases')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->
            
                            <div class="col-sm-6">
                                <div class="mb-3">
                                    <label class="form-label">Action Taken</label>
                                    <select name="action_taken" class="form-select mb-3 form-control custom-input @error('action_taken') is-invalid @enderror">
                                        <option value="" selected disabled>Select settled cases</option>
                                        <option value="None" {{ old('action_taken', $view_blotter_record->action_taken) === 'None' ? 'selected' : '' }}>None</option>
                                        <option value="Repudiated" {{ old('action_taken', $view_blotter_record->action_taken) === 'Repudiated' ? 'selected' : '' }}>Repudiated</option>
                                        <option value="Dismissed" {{ old('action_taken', $view_blotter_record->action_taken) === 'Dismissed' ? 'selected' : '' }}>Dismissed</option>
                                        <option value="Referred" {{ old('action_taken', $view_blotter_record->action_taken) === 'Referred' ? 'selected' : '' }}>Referred</option>
                                        <option value="Certified" {{ old('action_taken', $view_blotter_record->action_taken) === 'Certified' ? 'selected' : '' }}>Certified</option>
                                        <option value="Pending" {{ old('action_taken', $view_blotter_record->action_taken) === 'Pending' ? 'selected' : '' }}>Pending</option>
                                    </select>
                                    @error('action_taken')
                                    <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div><!-- Col -->
                        </div><!-- Row -->

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
